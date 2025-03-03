import React from "react";
import { Pencil, Trash2, CheckCircle, XCircle, Plus } from "lucide-react";

const Housekeeping = () => {
  // Sample housekeeping data (Replace this with API data later)
  const housekeepingData = [
    {
      housekeepingID: 1,
      roomID: 101,
      staffName: "Alice",
      cleaningDate: "2024-02-27",
      status: "Pending",
    },
    {
      housekeepingID: 2,
      roomID: 102,
      staffName: "Bob",
      cleaningDate: "2024-02-28",
      status: "In Progress",
    },
    {
      housekeepingID: 3,
      roomID: 103,
      staffName: "Charlie",
      cleaningDate: "2024-02-26",
      status: "Completed",
    },
    // Add more housekeeping records as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Housekeeping</h1>
        <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-blue-800 transition">
          <Plus size={18} /> Add Housekeeping
        </button>
      </div>

      {/* Housekeeping Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Housekeeping ID</th>
              <th className="px-4 py-3 font-semibold">Room ID</th>
              <th className="px-4 py-3 font-semibold">Staff Name</th>
              <th className="px-4 py-3 font-semibold">Cleaning Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {housekeepingData.map((task, index) => (
              <tr
                key={task.housekeepingID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{task.housekeepingID}</td>
                <td className="px-4 py-3">{task.roomID}</td>
                <td className="px-4 py-3">{task.staffName}</td>
                <td className="px-4 py-3">{task.cleaningDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`${
                      task.status === "Pending"
                        ? "text-yellow-500"
                        : task.status === "In Progress"
                        ? "text-blue-500"
                        : "text-green-500"
                    } font-semibold`}
                  >
                    {task.status}
                  </span>
                </td>
                {task.status === "Pending" && (
                    <td className="px-4 py-3 flex justify-end gap-3">
                        <button className="text-blue-600 hover:text-blue-800">
                            <Pencil size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                            <XCircle size={18} />
                        </button>
                    </td>
                )}
                {task.status === "In Progress" && (
                    <td className="px-4 py-3 flex justify-end gap-3">
                        <button className="text-green-600 hover:text-green-800">
                        <CheckCircle size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                            <XCircle size={18} />
                        </button>
                    </td>
                )}
                {task.status === "Completed" && (
                    <td className="px-4 py-3 flex justify-end gap-3">

                    </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Housekeeping;
