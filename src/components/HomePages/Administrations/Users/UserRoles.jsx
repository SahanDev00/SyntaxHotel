import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const UserRoles = () => {

  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/administration/roles`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setUserRoles(response.data)
        console.log(response.data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchUserRoles();
  }, [])

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
              <th className="px-4 py-3 font-semibold">Permissions</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userRoles.map((role, index) => (
              <tr
                key={role.roleID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
                }`}
              >
                <td className="px-4 py-3">{role.roleID}</td>
                <td className="px-4 py-3">{role.role_name}</td>
                <td className="px-4 py-3">{role.permissions}</td>
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
