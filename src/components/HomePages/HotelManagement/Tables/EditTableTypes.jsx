import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const EditTableTypes = () => {
  const [loading, setLoading] = useState(false);
  const [tableType, setTableType] = useState(null);
  const { tableTypeID } = useParams();
  
  useEffect(() => {
    const fetchTableTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tabletypes?TableTypeID=${tableTypeID}`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setTableType(response.data); 

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchTableTypes();
  }, [tableTypeID])

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    type_name: Yup.string().required("Type name is required"),
    price_per_hour: Yup.number()
      .min(0, "Fee amount must be a positive number")
      .required("Price per hour is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      tableTypeID: tableTypeID, // Always null for adding a new category
      type_name: tableType?.[0].type_name || "",
      description: tableType?.[0].description ||  "",
      price_per_hour: tableType?.[0].price_per_hour || "",
    },
    enableReinitialize: true, // Allows form to reinitialize when data is fetched
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/hotel/addtabletypes`,
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
          toast.success("Table type edited successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (err) {
        toast.error("Failed to edit Table type");
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Table Type</h1>
      </div>

      {/* table Type Form */}
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

          {/* price per hour */}
          <div>
            <label className="block text-gray-700">Price Per Hour</label>
            <input
              type="number"
              name="price_per_hour"
              {...formik.getFieldProps("price_per_hour")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.price_per_hour && formik.errors.price_per_hour && (
              <p className="text-red-500 text-sm">{formik.errors.price_per_hour}</p>
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
          {loading ? "Adding..." : "Add Table Type"}
        </button>
      </form>
    </div>
  );
};

export default EditTableTypes;
