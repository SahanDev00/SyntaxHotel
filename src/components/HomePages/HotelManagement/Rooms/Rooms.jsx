import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Rooms = () => {
 
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [selectedRoomID, setSelectedRoomID] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/rooms`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      });
      
      setRooms(response.data); // Save rooms
      
      // Fetch all unique customer categories
      const roomTypeIDs = [...new Set(response.data.map(r => r.roomTypeID))]; // Get unique Type IDs
      const categoryResponses = await Promise.all(
        roomTypeIDs.map(id =>
          axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/roomtypes?RoomTypeID=${id}`, {
            headers: { APIkey: process.env.REACT_APP_APIKey }
          })
        )
      );

      // Map categories to an object { categoryID: categoryData }
      const roomTypeMap = {};
      categoryResponses.forEach(res => {
        if (res.data.length > 0) {
          roomTypeMap[res.data[0].roomTypeID] = res.data[0].type_name;
        }
      });

      setRoomType(roomTypeMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [])

  const deleteRoom = async (roomID) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/hotel/deleteroom`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        },
        data: { roomID: roomID }
      });

      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success("Room Deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      // Refresh data immediately after deleting
      fetchRooms();
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
        <Link to='/add-room'> 
          <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
            <Plus size={18} /> Add Room
          </button>
        </Link>
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
                <td className="px-4 py-3">{roomType[room.roomTypeID] || "Unknown"}</td>
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
                <td className="px-4 py-3 flex justify-end items-center gap-3">
                  {room.status !== 'Occupied' && (
                    <button className="text-blue-600 hover:text-blue-800">
                      <Link to={`/edit-room/${room.roomID}`}>
                          <Pencil size={18} />
                      </Link>
                    </button>
                  )}
                  <button onClick={() => { setSelectedRoomID(room.roomID); setShowPopup(true); }} className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this room?</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => { deleteRoom(selectedRoomID); setShowPopup(false); }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Rooms;
