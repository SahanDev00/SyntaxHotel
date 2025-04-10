import React, { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CustomerCategory = ({ setActivePage }) => {
  const [customerCategories, setCustomerCategories] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchCustomerCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/category`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      });
      setCustomerCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCustomerCategories();
  }, []);

  const deleteCategory = async (categoryID) => {

    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/customers/deletecategory`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        },
        data: { CategoryID: categoryID }
      });

      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success("Customer Category Deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Refresh data immediately after deleting
        fetchCustomerCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Customer Categories</h1>
        <button onClick={() => setActivePage('add-customer-categories')} className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-blue-800 transition">
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-950 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Category ID</th>
              <th className="px-4 py-3 font-semibold">Category Name</th>
              <th className="px-4 py-3 font-semibold">Additional Fee Rate</th>
              <th className="px-4 py-3 font-semibold">Additional Fee Amount</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerCategories.map((category, index) => (
              <tr
                key={category.id}
                className={`text-gray-800 text-sm font-medium ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{category.categoryID}</td>
                <td className="px-4 py-3">{category.category_name}</td>
                <td className="px-4 py-3">{category.additionalFeeRate}</td>
                <td className="px-4 py-3">{category.additionalFeeAmount}</td>
                <td className="px-4 py-3 flex justify-end gap-3">
                  <Link to={`/edit-customer-category/${category.categoryID}`}>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                  </Link>
                  <button onClick={() => { setSelectedCategoryID(category.categoryID); setShowPopup(true); }} className="text-red-600 hover:text-red-800">
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
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this category?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => { deleteCategory(selectedCategoryID); setShowPopup(false); }}
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

export default CustomerCategory;
