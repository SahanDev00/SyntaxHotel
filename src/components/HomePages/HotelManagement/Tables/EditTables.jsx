import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const EditTables = () => {
  const [loading, setLoading] = useState(false);
  const [tableTypes, setTableTypes] = useState([]);
  const [table, setTable] = useState(null);
  const { tableID } = useParams();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tables?TableID=${tableID}`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
  
        setTable(response.data); // Save tables
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchTables();
  }, [tableID])

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
      tableID: tableID, // Always null for adding a new category
      table_number: table?.[0].table_number || '',
      tableTypeID: table?.[0].tableTypeID || '',
      status: table?.[0].status || "",
    },
    enableReinitialize: true, // Allows form to reinitialize when data is fetched
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
          toast.success("Table edited successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (err) {
        toast.error("Failed to edit table");
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Tables</h1>
      </div>

      {/* Tables Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Table Number */}
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
              <option value="Available">Available</option>
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
          {loading ? "Editing..." : "Edit Table"}
        </button>
      </form>
    </div>
  );
};

export default EditTables;
