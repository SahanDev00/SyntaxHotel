import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from "axios";
import { Link } from 'react-router-dom'

const TableTypes = () => {

  const [tableTypes, setTableTypes] = useState([]);
  
  useEffect(() => {
    const fetchTableTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tabletypes`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setTableTypes(response.data); 

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchTableTypes();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Table Types</h1>
        <Link to='/add-table-types'>
          <button className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-purple-800 transition">
            <Plus size={18} /> Add Table Type
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
              <th className="px-4 py-3 font-semibold">Price/Hour</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableTypes.map((type, index) => (
              <tr
                key={type.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{type.tableTypeID}</td>
                <td className="px-4 py-3">{type.type_name}</td>
                <td className="px-4 py-3">{type.description}</td>
                <td className="px-4 py-3 font-bold text-green-600">{type.price_per_hour}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Link to={`/edit-table-type/${type.tableTypeID}`}>
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

export default TableTypes;
