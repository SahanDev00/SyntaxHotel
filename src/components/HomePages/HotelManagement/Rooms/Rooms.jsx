import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from 'axios'

const Rooms = () => {
 
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState([]);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/rooms`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setRooms(response.data); // Save rooms
  
        if (response.data.length > 0) { // Check if rooms exist
          const roomTypeID = response.data[0].roomTypeID; // Get the first room's RoomTypeID
  
          const typeResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/roomtypes?RoomTypeID=${roomTypeID}`, {
            headers: {
              APIkey: process.env.REACT_APP_APIKey
            }
          });
  
          setRoomType(typeResponse.data);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchRooms();
  }, [])
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
        <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
          <Plus size={18} /> Add Room
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Room ID</th>
              <th className="px-4 py-3 font-semibold">Room Number</th>
              <th className="px-4 py-3 font-semibold">Room Type</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                key={room.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{room.roomID}</td>
                <td className="px-4 py-3">{room.room_number}</td>
                <td className="px-4 py-3">{roomType.length > 0 ? roomType[0].type_name : "Unknown"}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    room.status === "Available"
                      ? "text-green-600"
                      : room.status === "Occupied"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {room.status}
                </td>
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

export default Rooms;
