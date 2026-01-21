"use client"

import { updateUserRole, deleteUser, toggleUserStatus } from "@/lib/actions/user-actions";
import { useState } from "react";
import { User } from "@/types/types";

export default function UserTable({ data }: { data: User[] }) {
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setError(null);
      await updateUserRole(userId, newRole);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    }
  };

  const handleStatusToggle = async (userId: string, isVerified: boolean) => {
    try {
      setError(null);
      await toggleUserStatus(userId, isVerified);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Delete user?')) return;

    try {
      setError(null);
      await deleteUser(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4">
          {error}
        </div>
      )}
      <table className="w-full text-left bg-white">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </td>
              <td className="p-4">
                <select
                  className="border rounded p-1"
                  defaultValue={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs ${u.emailVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {u.emailVerified ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => handleStatusToggle(u.id, u.emailVerified)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {u.emailVerified ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
