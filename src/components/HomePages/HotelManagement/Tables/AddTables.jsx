import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddTables = () => {
  const [loading, setLoading] = useState(false);
  const [tableTypes, setTableTypes] = useState([]);

  useEffect(() => {
    const fetchTableTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tabletypes`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setTableTypes(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchTableTypes();
  }, [])

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    table_number: Yup.string().required("Table number is required"),
    tableTypeID: Yup.string()
      .required("Table Type is required"),
    status: Yup.string()
      .required("Table status is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      tableID: null, // Always null for adding a new category
      table_number: "",
      tableTypeID: "",
      status: "Available",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/hotel/addtables`,
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
          toast.success("Table added successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          formik.resetForm();
        }
      } catch (err) {
        toast.error("Failed to add table");
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
        <h1 className="text-2xl font-bold text-gray-900">Add Tables</h1>
      </div>

      {/* table Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Room Number */}
          <div>
            <label className="block text-gray-700">Table Number</label>
            <input
              type="text"
              name="table_number"
              {...formik.getFieldProps("table_number")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.table_number && formik.errors.table_number && (
              <p className="text-red-500 text-sm">{formik.errors.table_number}</p>
            )}
          </div>

          {/* Table type */}
          <div>
            <label className="block text-gray-700">Table Type</label>
            <select
              name="tableTypeID"
              value={formik.values.tableTypeID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1 text-black"
            >
              <option value="">Select table type</option>
              {tableTypes.map((type) => (
                <option key={type.tableTypeID} value={type.tableTypeID}>
                  {type.type_name}
                </option>
              ))}
            </select>
            {formik.touched.tableTypeID && formik.errors.tableTypeID && (
              <p className="text-red-500 text-sm">{formik.errors.tableTypeID}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700">Table Status</label>
            <select
              name="status"
              {...formik.getFieldProps("status")}
              className="w-full px-5 py-2 border rounded mt-1"
            >
              <option value="Active">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-sm">{formik.errors.status}</p>
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
          {loading ? "Adding..." : "Add Table"}
        </button>
      </form>
    </div>
  );
};

export default AddTables;
