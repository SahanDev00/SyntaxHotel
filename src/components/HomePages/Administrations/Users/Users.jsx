import React from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'

const Users = () => {
  // Sample data for users (Replace this with actual data fetching logic)
  const usersData = [
    {
      userID: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      role: "Admin",
      phone: "123-456-7890",
      status: "Active",
      createdAt: "2024-01-01",
    },
    {
      userID: 2,
      username: "jane_doe",
      email: "jane.doe@example.com",
      role: "Manager",
      phone: "234-567-8901",
      status: "Active",
      createdAt: "2024-01-05",
    },
    {
      userID: 3,
      username: "alex_smith",
      email: "alex.smith@example.com",
      role: "Staff",
      phone: "345-678-9012",
      status: "Inactive",
      createdAt: "2024-02-01",
    }
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <button className="flex items-center gap-2 bg-yellow-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-blue-800 transition">
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-yellow-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">User ID</th>
              <th className="px-4 py-3 font-semibold">Username</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr
                key={user.userID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
                }`}
              >
                <td className="px-4 py-3">{user.userID}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3">{user.createdAt}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
