import { db } from "@/db";
import { user } from "@/db/schema";
import { desc } from "drizzle-orm";
import UserTable from "./user-table";

export default async function AdminUserPage() {
  const allUsers = await db.select().from(user).orderBy(desc(user.createdAt));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserTable data={allUsers} />
    </div>
  );
}