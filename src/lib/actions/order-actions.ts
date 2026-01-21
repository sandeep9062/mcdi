"use server"

import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { nanoid } from "nanoid";

export async function createOrder(userId: string, items: any[]) {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const orderId = nanoid();

  // 1. Create the main order record
  await db.insert(orders).values({
    id: orderId,
    userId,
    totalAmount: total,
    status: "pending",
  });

  // 2. Create individual order items
  const itemsToInsert = items.map(item => ({
    id: nanoid(),
    orderId: orderId,
    courseId: item.id,
    price: item.price
  }));

  await db.insert(orderItems).values(itemsToInsert);

  // 3. Trigger Payment Gateway here (Stripe/Razorpay)
  return { orderId, total };
}