import React from "react";
import { Pencil, Trash, Plus } from "lucide-react";

const CustomerCategory = () => {
  // Sample category data (Replace this with API data later)
  const categories = [
    {
      id: 1,
      categoryName: "VIP",
      additionalFeeRate: "10%",
      additionalFeeAmount: "$50",
    },
    {
      id: 2,
      categoryName: "Regular",
      additionalFeeRate: "5%",
      additionalFeeAmount: "$20",
    },
    {
      id: 3,
      categoryName: "Guest",
      additionalFeeRate: "0%",
      additionalFeeAmount: "$0",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Customer Categories</h1>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-blue-800 transition">
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Category ID</th>
              <th className="px-4 py-3 font-semibold">Category Name</th>
              <th className="px-4 py-3 font-semibold">Additional Fee Rate</th>
              <th className="px-4 py-3 font-semibold">Additional Fee Amount</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{category.id}</td>
                <td className="px-4 py-3">{category.categoryName}</td>
                <td className="px-4 py-3">{category.additionalFeeRate}</td>
                <td className="px-4 py-3">{category.additionalFeeAmount}</td>
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

export default CustomerCategory;
