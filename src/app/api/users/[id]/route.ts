import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params

  const result = await db.select().from(user).where(eq(user.id, userId))

  if (!result.length) {
    return Response.json({ error: "Not Found" }, { status: 404 })
  }

  return Response.json(result[0])
}
