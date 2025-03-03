import React from "react";
import { Pencil, Plus} from "lucide-react";

const Staff = () => {
  // Sample staff data (Replace this with API data later)
  const staffData = [
    {
      staffID: 1,
      userID: 101,
      firstName: "John",
      lastName: "Doe",
      NIC: "123456789V",
      mobileNumber: "+94 701234567",
      position: "Manager",
      salary: "$2500",
      status: 'Active',
      hiredDate: "2022-01-15",
    },
    {
      staffID: 2,
      userID: 102,
      firstName: "Jane",
      lastName: "Smith",
      NIC: "987654321V",
      mobileNumber: "+94 711234567",
      position: "Waiter",
      salary: "$1200",
      status: 'Innactive',
      hiredDate: "2023-06-10",
    },
    {
      staffID: 3,
      userID: 105,
      firstName: "Duke",
      lastName: "Smith",
      NIC: "987654321V",
      mobileNumber: "+94 711234567",
      position: "Waiter",
      salary: "$1200",
      status: 'Resigned',
      hiredDate: "2023-06-10",
    },
    // Add more staff members as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Staff Members</h1>
        <button className="flex items-center gap-2 bg-green-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-green-800 transition">
          <Plus size={18} /> Add Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Staff ID</th>
              <th className="px-4 py-3 font-semibold">Full Name</th>
              <th className="px-4 py-3 font-semibold">NIC</th>
              <th className="px-4 py-3 font-semibold">Mobile Number</th>
              <th className="px-4 py-3 font-semibold">Position</th>
              <th className="px-4 py-3 font-semibold">Salary</th>
              <th className="px-4 py-3 font-semibold">Hired Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr
                key={staff.staffID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{staff.staffID}</td>
                <td className="px-4 py-3">
                  {staff.firstName} {staff.lastName}
                </td>
                <td className="px-4 py-3">{staff.NIC}</td>
                <td className="px-4 py-3">{staff.mobileNumber}</td>
                <td className="px-4 py-3">{staff.position}</td>
                <td className="px-4 py-3">{staff.salary}</td>
                <td className="px-4 py-3">{staff.hiredDate}</td>
                <td 
                  className={`px-4 py-3 font-bold ${
                    staff.status === "Active"
                      ? "text-green-600"
                      : staff.status === "Resigned"
                      ? "text-red-600"
                      : "text-yellow-600"}`}
                >{staff.status}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
