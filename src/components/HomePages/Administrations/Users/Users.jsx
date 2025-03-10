import React, { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import axios from 'axios'

const Users = () => {

  const [users, setUsers] = useState([]);
  const [staffName, setStaffName] = useState([]);
  const [roleName, setRoleName] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/administration/users`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setUsers(response.data)
        console.log(response.data)

        //staff name
        if (response.data.length > 0) { 
          const staffID = response.data[0].staffID; 
          const staffResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/staff/staff?staffID=${staffID}`, {
            headers: {
              APIkey: process.env.REACT_APP_APIKey
            }
          });
          setStaffName(staffResponse.data);
          console.log(staffResponse.data)
        }

        //roles
        if (response.data.length > 0) { 
          const roleID = response.data[0].roleID; 
          const roleResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/administration/roles?roleID=${roleID}`, {
            headers: {
              APIkey: process.env.REACT_APP_APIKey
            }
          });
          setRoleName(roleResponse.data);
          console.log(roleResponse.data)
        }

      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers();
  }, [])

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
              <th className="px-4 py-3 font-semibold">Staff Name</th>
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
            {users.map((user, index) => (
              <tr
                key={user.userID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
                }`}
              >
                <td className="px-4 py-3">{user.userID}</td>
                <td className="px-4 py-3">{staffName.length > 0 ? staffName[0].firstName : "Unknown"}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{roleName.length > 0 ? roleName[0].role_name : "Unknown"}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3">{new Date(user.created_at).toLocaleString()}</td>
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
