import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import axios from "axios";

const StaffPositions = () => {

  const [position, setPosition] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/staff/positions`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setPosition(response.data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchPositions();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Staff Positions</h1>
        <button className="flex items-center gap-2 bg-green-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-green-800 transition">
          <Plus size={18} /> Add Position
        </button>
      </div>

      {/* Staff Positions Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Position ID</th>
              <th className="px-4 py-3 font-semibold">Position Name</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {position.map((position, index) => (
              <tr
                key={position.positionID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{position.positionID}</td>
                <td className="px-4 py-3">{position.position_name}</td>
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
  );
};

export default StaffPositions;
