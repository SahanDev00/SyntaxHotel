import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'

const UserRoles = () => {
  // Sample data for roles (Replace with actual data fetching logic)
  const rolesData = [
    {
      roleID: 1,
      role_name: "Admin"
    },
    {
      roleID: 2,
      role_name: "Manager"
    },
    {
      roleID: 3,
      role_name: "Receptionist"
    },
    {
      roleID: 4,
      role_name: "Staff"
    },
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">User Roles</h1>
      </div>

      {/* Roles Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Role ID</th>
              <th className="px-4 py-3 font-semibold">Role Name</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rolesData.map((role, index) => (
              <tr
                key={role.roleID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
                }`}
              >
                <td className="px-4 py-3">{role.roleID}</td>
                <td className="px-4 py-3">{role.role_name}</td>
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

export default UserRoles
