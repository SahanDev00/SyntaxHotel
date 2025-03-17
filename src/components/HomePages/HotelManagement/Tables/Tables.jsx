import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Tables = () => {

  const [tables, setTables] = useState([]);
  const [tableType, setTableType] = useState([]);
  
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tables`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setTables(response.data); // Save rooms
  
        // Fetch all unique table types
        const tableTypeIDs = [...new Set(response.data.map(r => r.tableTypeID))]; // Get unique Type IDs
        const categoryResponses = await Promise.all(
          tableTypeIDs.map(id =>
            axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tabletypes?TableTypeID=${id}`, {
              headers: { APIkey: process.env.REACT_APP_APIKey }
            })
          )
        );

        // Map types to an object 
        const tableTypeMap = {};
        categoryResponses.forEach(res => {
          if (res.data.length > 0) {
            tableTypeMap[res.data[0].tableTypeID] = res.data[0].type_name;
          }
        });

      setTableType(tableTypeMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchTables();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Tables</h1>
        <Link to='/add-tables'>
            <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
              <Plus size={18} /> Add Table
            </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Table ID</th>
              <th className="px-4 py-3 font-semibold">Table Number</th>
              <th className="px-4 py-3 font-semibold">Table Type</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, index) => (
              <tr
                key={table.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{table.tableID}</td>
                <td className="px-4 py-3">{table.table_number}</td>
                <td className="px-4 py-3">{tableType[table.tableTypeID] || "Unknown"}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    table.status === "Available"
                      ? "text-green-600"
                      : table.status === "Occupied"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {table.status}
                </td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Link to={`/edit-table/${table.tableID}`}>
                      <Pencil size={18} />
                    </Link>
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

export default Tables;
