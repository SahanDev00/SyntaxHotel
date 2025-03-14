import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [customerCategories, setCustomerCategories] = useState([]);

  useEffect(() => {
    const fetchCustomerCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/category`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        })
        setCustomerCategories(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCustomerCategories();
  }, [])

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be a number")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    customer_categoryID: Yup.string()
      .required("Category is required"),
    address: Yup.string().required("Address is required"),
    status: Yup.string().oneOf(["Active", "Inactive"], "Invalid status"),
    banned_reason: Yup.string().nullable(),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      CustomerID: null, // Always null for adding a new customer
      customer_categoryID: "",
      full_name: "",
      phone: "",
      email: "",
      address: "",
      status: "Active"
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/customers/addeditcustomers`,
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
          toast.success("Customer added successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          formik.resetForm();
        }
      } catch (err) {
        toast.error('Failed to add customer', {
          position: "top-right",
          autoClose: 2000,
        })
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
        <h1 className="text-2xl font-bold text-gray-900">Add Customer</h1>
      </div>

      {/* Customer Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="full_name"
              {...formik.getFieldProps("full_name")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.full_name && formik.errors.full_name && (
              <p className="text-red-500 text-sm">{formik.errors.full_name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              {...formik.getFieldProps("phone")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="customer_categoryID"
              value={formik.values.customer_categoryID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1 text-black"
            >
              <option value="">Select a category</option>
              {customerCategories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {formik.touched.customer_categoryID && formik.errors.customer_categoryID && (
              <p className="text-red-500 text-sm">{formik.errors.customer_categoryID}</p>
            )}
          </div>



          {/* Address */}
          <div className="col-span-2">
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              {...formik.getFieldProps("address")}
              className="w-full p-2 border rounded mt-1"
              rows="3"
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              {...formik.getFieldProps("status")}
              className="w-full px-5 py-2 border rounded mt-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
          {loading ? "Adding..." : "Add Customer"}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
