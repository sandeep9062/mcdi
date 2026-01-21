import { db } from "@/db"
import { user } from "@/db/schema"
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Example: Insert into Neon/Drizzle
    const newUser = await db.insert(user).values({
      id: randomUUID(),
      name: body.name,
      email: body.email
    }).returning()

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
