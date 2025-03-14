import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RoomTypes = () => {

  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomTypeID, setSelectedRoomTypeID] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  useEffect(() => {
    fetchRoomTypes();
  }, [])

  const deleteRoomType = async (roomTypeID) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/hotel/deleteroomtype`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        },
        data: { roomTypeID: roomTypeID }
      });

      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success("Room Type Deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      // Refresh data immediately after deleting
      fetchRoomTypes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Room Types</h1>
        <Link to='/add-room-types'>
          <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
            <Plus size={18} /> Add Room Type
          </button>
        </Link>
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
                <td className="px-4 py-3 font-bold text-green-600">{type.price_per_night}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Link to={`/edit-room-type/${type.roomTypeID}`}>
                      <Pencil size={18} />
                    </Link>
                  </button>
                  <button onClick={() => { setSelectedRoomTypeID(type.roomTypeID); setShowPopup(true); }} className="text-red-600 hover:text-red-800">
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
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this room type?</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => { deleteRoomType(selectedRoomTypeID); setShowPopup(false); }}
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

export default RoomTypes;
