import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddRoomTypes = () => {
  const [loading, setLoading] = useState(false);

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    type_name: Yup.string().required("Type name is required"),
    price_per_night: Yup.number()
      .min(0, "Fee amount must be a positive number")
      .required("Price per night is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      roomTypeID: null, // Always null for adding a new category
      type_name: "",
      description: "",
      price_per_night: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/hotel/addroomtypes`,
          values,
          {
            headers: {
              APIKey: process.env.REACT_APP_APIKey,
            },
          }
        );
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 2000,
          })
        } else {
          toast.success("Room type added successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          formik.resetForm();
        }
      } catch (err) {
        toast.error("Failed to add Room type");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Add Room Types</h1>
      </div>

      {/* Room Type Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type Name */}
          <div>
            <label className="block text-gray-700">Type Name</label>
            <input
              type="text"
              name="type_name"
              {...formik.getFieldProps("type_name")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.type_name && formik.errors.type_name && (
              <p className="text-red-500 text-sm">{formik.errors.type_name}</p>
            )}
          </div>

          {/* Description  */}
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              {...formik.getFieldProps("description")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}
          </div>

          {/* price per night */}
          <div>
            <label className="block text-gray-700">Price Per Night</label>
            <input
              type="number"
              name="price_per_night"
              {...formik.getFieldProps("price_per_night")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.price_per_night && formik.errors.price_per_night && (
              <p className="text-red-500 text-sm">{formik.errors.price_per_night}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 rounded text-white transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Room Type"}
        </button>
      </form>
    </div>
  );
};

export default AddRoomTypes;
