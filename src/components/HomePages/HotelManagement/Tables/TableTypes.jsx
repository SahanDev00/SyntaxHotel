import React from "react";
import { Pencil, Trash, Plus } from "lucide-react";

const TableTypes = () => {
  // Sample data (Replace with API data later)
  const tableTypes = [
    { id: 1, name: "Standard", description: "Basic table with seating for 4", price: "$10/hr" },
    { id: 2, name: "VIP", description: "Premium table with extra space", price: "$20/hr" },
    { id: 3, name: "Outdoor", description: "Open-air table with a great view", price: "$15/hr" },
    { id: 4, name: "Private", description: "Private dining area for special occasions", price: "$30/hr" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Table Types</h1>
        <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
          <Plus size={18} /> Add Table Type
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-900 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Type ID</th>
              <th className="px-4 py-3 font-semibold">Type Name</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold">Price/Hour</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableTypes.map((type, index) => (
              <tr
                key={type.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{type.id}</td>
                <td className="px-4 py-3">{type.name}</td>
                <td className="px-4 py-3">{type.description}</td>
                <td className="px-4 py-3 font-bold text-green-600">{type.price}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
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

export default TableTypes;
