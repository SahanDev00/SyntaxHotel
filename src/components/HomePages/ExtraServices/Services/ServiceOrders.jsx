import React from "react";
import { Pencil, CheckCircle, XCircle, Plus } from "lucide-react";

const ServiceOrders = () => {
  // Sample service orders data (Replace this with API data later)
  const serviceOrdersData = [
    {
      serviceOrderID: 1,
      bookingID: 101,
      customerName: "Alice",
      serviceName: "Spa",
      orderDate: "2024-02-27",
      status: "Requested",
    },
    {
      serviceOrderID: 2,
      bookingID: 102,
      customerName: "Bob",
      serviceName: "Laundry",
      orderDate: "2024-02-28",
      status: "Completed",
    },
    {
      serviceOrderID: 3,
      bookingID: 103,
      customerName: "Charlie",
      serviceName: "Room Service",
      orderDate: "2024-02-26",
      status: "Requested",
    },
    {
      serviceOrderID: 3,
      bookingID: 103,
      customerName: "Charlie",
      serviceName: "Room Service",
      orderDate: "2024-02-26",
      status: "Cancelled",
    },
    // Add more service orders as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Service Orders</h1>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-green-800 transition">
          <Plus size={18} /> Add Order
        </button>
      </div>

      {/* Service Orders Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-900 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Order ID</th>
              <th className="px-4 py-3 font-semibold">Customer Name</th>
              <th className="px-4 py-3 font-semibold">Service Name</th>
              <th className="px-4 py-3 font-semibold">Order Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceOrdersData.map((order, index) => (
              <tr
                key={order.serviceOrderID}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{order.serviceOrderID}</td>
                <td className="px-4 py-3">{order.customerName}</td>
                <td className="px-4 py-3">{order.serviceName}</td>
                <td className="px-4 py-3">{order.orderDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`${order.status === "Requested" && "text-yellow-500"} ${order.status === "Cancelled" && "text-red-500"} ${order.status === "Completed" && "text-green-500"} font-semibold`}
                  >
                    {order.status}
                  </span>
                </td>
                {order.status === "Requested" && ( 
                    <td className="px-4 py-3 flex justify-end gap-3">
                        <button className="text-blue-600 hover:text-blue-800">
                            <Pencil size={18} />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                            <CheckCircle size={18} />
                        </button>
                        <button className="text-red-600 hover:text-gray-800">
                            <XCircle size={18} />
                        </button>
                    </td>
                )}
                {order.status === "Completed" && (
                    <td className="px-4 py-3 flex justify-end gap-3">

                    </td>
                )}
                {order.status === "Cancelled" && (
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

export default ServiceOrders;
