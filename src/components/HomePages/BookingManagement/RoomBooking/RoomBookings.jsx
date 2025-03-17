import React, { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import axios from 'axios'
import { Link } from "react-router-dom";

const RoomBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchRoomBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/booking/roombookings`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setBookings(response.data)
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRoomBookings();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Room Bookings</h1>
        <Link to='/add-room-booking'>
          <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
            <Plus size={18} /> Add Booking
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Booking ID</th>
              <th className="px-4 py-3 font-semibold">Customer Name</th>
              <th className="px-4 py-3 font-semibold">Room Number</th>
              <th className="px-4 py-3 font-semibold">Check-in</th>
              <th className="px-4 py-3 font-semibold">Check-out</th>
              <th className="px-4 py-3 font-semibold">Total Price</th>
              <th className="px-4 py-3 font-semibold">Paid Price</th>
              <th className="px-4 py-3 font-semibold">Staff</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.bookingID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{booking.bookingID}</td>
                <td className="px-4 py-3">{booking.full_name}</td>
                <td className="px-4 py-3">{booking.room_number}</td>
                <td className="px-4 py-3">{new Date(booking.check_in_date).toLocaleString()}</td>
                <td className="px-4 py-3">{new Date(booking.check_out_date).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">Rs. {new Intl.NumberFormat().format(booking.total_price)}</td>
                <td className="px-4 py-3 text-right">Rs. {new Intl.NumberFormat().format(booking.paid_price || 0)}</td>
                <td className="px-4 py-3">{booking.fullName}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    booking.booking_status === "Booked"
                    ? "text-blue-600"
                    : booking.booking_status === "Checked-in"
                    ? "text-green-600"
                    : booking.booking_status === "Checked-out"
                    ? "text-yellow-500"
                    : "text-red-600"
                  }`}
                >
                  {booking.booking_status}
                </td>
                <td className="px-4 py-3">{new Date(booking.created_at).toLocaleString()}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Link to={`/edit-room-booking/${booking.bookingID}`}>
                      <Pencil size={18} />
                    </Link>
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

export default RoomBookings;
