import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from 'axios'

const RoomTypes = () => {

  const [roomTypes, setRoomTypes] = useState([]);
  
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/roomtypes`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setRoomTypes(response.data); 

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchRoomTypes();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Room Types</h1>
        <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
          <Plus size={18} /> Add Room Type
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
              <th className="px-4 py-3 font-semibold">Price/Night</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((type, index) => (
              <tr
                key={type.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{type.roomTypeID}</td>
                <td className="px-4 py-3">{type.type_name}</td>
                <td className="px-4 py-3">{type.description}</td>
                <td className="px-4 py-3 font-bold text-green-600">RS. {type.price_per_night}</td>
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

export default RoomTypes;
