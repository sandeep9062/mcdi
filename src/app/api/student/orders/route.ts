import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { orders, orderItems, course, exam, note, testSeries, video } from '@/db/schema';
import { eq, and, inArray } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    

    // Get all orders for the current user
    const userOrders = await db.query.orders.findMany({
      where: eq(orders.userId, session.user.id),
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
      with: {
        orderItems: {
          with: {
            course: true,
            testSeries: true,
            video: true
          }
        }
      }
    });

    // Transform the data to match the frontend structure
    const ordersData = userOrders.map(order => ({
      id: order.id,
      orderId: order.id,
      total: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.orderItems.map((item: any) => {
        let itemData = null;
        
        if (item.courseId && item.course) {
          itemData = {
            id: item.course.id,
            title: item.course.title,
            type: 'course',
            price: item.price
          };
        } else if (item.testSeriesId && item.testSeries) {
          itemData = {
            id: item.testSeries.id,
            title: item.testSeries.title,
            type: 'testSeries',
            price: item.price
          };
        } else if (item.videoId && item.video) {
          itemData = {
            id: item.video.id,
            title: item.video.title,
            type: 'video',
            price: item.price
          };
        }

        return {
          id: item.id,
          ...itemData,
          quantity: item.quantity
        };
      })
    }));

    return NextResponse.json(ordersData);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}