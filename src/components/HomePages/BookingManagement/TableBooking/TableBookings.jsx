import React from "react";
import { Pencil, Plus } from "lucide-react";

const TableBookings = () => {
  // Sample table booking data (Replace this with API data later)
  const tableBookings = [
    {
      bookingID: 4,
      customerID: 106,
      roomID: null,
      tableID: 15,
      customerName: "Jonathan",
      roomNumber: 108,
      checkIn: "2024-03-01",
      checkOut: "2024-03-05",
      bookingStatus: "Checked-out",
      totalPrice: "$450",
      createdAt: "2024-02-28",
    },
    {
      bookingID: 5,
      customerID: 107,
      roomID: null,
      tableID: 16,
      customerName: "Emily Davis",
      roomNumber: 109,
      checkIn: "2024-04-10",
      checkOut: "2024-04-15",
      bookingStatus: "Booked",
      totalPrice: "$300",
      createdAt: "2024-04-01",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Table Bookings</h1>
        <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
          <Plus size={18} /> Add Booking
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Booking ID</th>
              <th className="px-4 py-3 font-semibold">Customer Name</th>
              <th className="px-4 py-3 font-semibold">Table Number</th>
              <th className="px-4 py-3 font-semibold">For Hours</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Total Price</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableBookings.map((booking, index) => (
              <tr
                key={booking.bookingID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{booking.bookingID}</td>
                <td className="px-4 py-3">{booking.customerName}</td>
                <td className="px-4 py-3">{booking.tableID}</td>
                <td className="px-4 py-3">{booking.checkIn}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    booking.bookingStatus === "Booked"
                      ? "text-blue-600"
                      : booking.bookingStatus === "Checked-in"
                      ? "text-green-600"
                      : booking.bookingStatus === "Checked-out"
                      ? "text-gray-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.bookingStatus}
                </td>
                <td className="px-4 py-3">{booking.totalPrice}</td>
                <td className="px-4 py-3">{booking.createdAt}</td>
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

export default TableBookings;
