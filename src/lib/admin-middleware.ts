import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function requireAdmin(request: NextRequest): Promise<{
  success: boolean;
  response?: NextResponse;
  user?: { id: string; email: string; name: string; role: string };
}> {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ),
      };
    }

    // Get user role from database
    const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
    if (!dbUser.length) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ),
      };
    }

    if (dbUser[0].role !== 'admin') {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        ),
      };
    }

    return {
      success: true,
      user: {
        id: dbUser[0].id,
        email: dbUser[0].email,
        name: dbUser[0].name || '',
        role: dbUser[0].role,
      },
    };
  } catch (error) {
    console.error('Admin middleware error:', error);
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      ),
    };
  }
}
