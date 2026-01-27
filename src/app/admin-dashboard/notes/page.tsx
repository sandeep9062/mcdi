import { db } from "@/db";
import { note } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NotesTable from "./notes-table";
import { Note } from "@/types/types";

export default async function AdminNotesPage() {
  const rawNotes = await db.select().from(note).orderBy(desc(note.createdAt));

  const allNotes: Note[] = rawNotes.map((n: any) => ({
    ...n,
    tags: Array.isArray(n.tags) ? n.tags : [],
    
    // We use (n as any) or casting the map parameter to 'any' 
    // to stop the "Property price does not exist" error during build.
    price: n.price ?? 0, 
    originalPrice: n.originalPrice ?? null,

    dateCreated: n.createdAt ? new Date(n.createdAt).toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notes Management</h1>
        <Link href="/admin-dashboard/notes/notes-form">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Note
          </Button>
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Notes Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-2xl font-bold text-blue-600">{allNotes.length}</div>
            <div className="text-blue-700">Total Notes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {allNotes.filter(n => n.featured).length}
            </div>
            <div className="text-green-700">Featured</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {allNotes.filter(n => n.popular).length}
            </div>
            <div className="text-purple-700">Popular</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {new Set(allNotes.map(n => n.category)).size}
            </div>
            <div className="text-orange-700">Categories</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <NotesTable data={allNotes} />
      </div>
    </div>
  );
}