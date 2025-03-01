import React from "react";
import { Pencil, Plus, Info } from "lucide-react";

const Customers = () => {
  // Sample customer data (Replace this with API data later)
  const customers = [
    {
      id: 1,
      categoryID: 101,
      fullName: "John Doe",
      phone: "+1 123-456-7890",
      email: "john.doe@example.com",
      address: "123 Main Street, NY",
      status: "Active",
      bannedReason: null,
      createdAt: "2024-02-20",
    },
    {
      id: 2,
      categoryID: 102,
      fullName: "Jane Smith",
      phone: "+1 987-654-3210",
      email: "jane.smith@example.com",
      address: "456 Oak Street, LA",
      status: "Banned",
      bannedReason: "Fraudulent activity detected",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      categoryID: 103,
      fullName: "Mike Johnson",
      phone: "+1 555-123-4567",
      email: "mike.johnson@example.com",
      address: "789 Pine Street, TX",
      status: "Inactive",
      bannedReason: null,
      createdAt: "2023-12-10",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Customer ID</th>
              <th className="px-4 py-3 font-semibold">Full Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Address</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{customer.id}</td>
                <td className="px-4 py-3">{customer.fullName}</td>
                <td className="px-4 py-3">{customer.categoryID}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.address}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    customer.status === "Active"
                      ? "text-green-600"
                      : customer.status === "Inactive"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {customer.status}
                  {customer.status === "Banned" && (
                    <span className="ml-2 text-red-500 flex items-center">
                      <Info size={16} className="mr-1" />
                      {customer.bannedReason}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{customer.createdAt}</td>
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

export default Customers;
