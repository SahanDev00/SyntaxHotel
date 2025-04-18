import React, { useEffect, useState } from "react";
import { Pencil, Plus, Info } from "lucide-react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Customers = ({ setActivePage }) => {

  const [customers, setCustomers] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/customers`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setCustomers(response.data);
  
        // Fetch all unique customer categories
        const categoryIDs = [...new Set(response.data.map(c => c.customer_categoryID))]; // Get unique category IDs
        const categoryResponses = await Promise.all(
          categoryIDs.map(id =>
            axios.get(`${process.env.REACT_APP_BASE_URL}/customers/category?CategoryID=${id}`, {
              headers: { APIkey: process.env.REACT_APP_APIKey }
            })
          )
        );
  
        // Map categories to an object { categoryID: categoryData }
        const categoriesMap = {};
        categoryResponses.forEach(res => {
          if (res.data.length > 0) {
            categoriesMap[res.data[0].categoryID] = res.data[0].category_name;
          }
        });
  
        setCustomerTypes(categoriesMap);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchCustomers();
  }, []);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <button onClick={() => setActivePage('add-customers')} className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
            <Plus size={18} /> Add Customer
          </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Customer ID</th>
              <th className="px-4 py-3 font-semibold">Full Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Address</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{customer.CustomerID}</td>
                <td className="px-4 py-3">{customer.full_name}</td>
                <td className="px-4 py-3">{customerTypes[customer.customer_categoryID] || "Unknown"}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.address}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    customer.status === "Active"
                      ? "text-green-600"
                      : customer.status === "Inactive"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {customer.status}
                  {customer.status === "Banned" && (
                    <span className="ml-2 text-red-500 flex items-center">
                      <Info size={16} className="mr-1" />
                      {customer.bannedReason}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(customer.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Link to={`/edit-customer/${customer.CustomerID}`}>
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

export default Customers;
