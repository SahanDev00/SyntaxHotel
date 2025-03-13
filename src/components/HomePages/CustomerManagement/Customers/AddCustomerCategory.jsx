import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddCustomerCategory = () => {
  const [loading, setLoading] = useState(false);

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required("Category name is required"),
    additionalFeeRate: Yup.number()
      .min(0, "Fee rate must be a positive number")
      .required("Additional fee rate is required"),
    additionalFeeAmount: Yup.number()
      .min(0, "Fee amount must be a positive number")
      .required("Additional fee amount is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      CategoryID: null, // Always null for adding a new category
      category_name: "",
      additionalFeeRate: 0,
      additionalFeeAmount: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/customers/addeditcustomercategory`,
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
          toast.success("Customer Category added successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          formik.resetForm();
        }
      } catch (err) {
        toast.error("Failed to add Customer Category");
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
        <h1 className="text-2xl font-bold text-gray-900">Add Customer Category</h1>
      </div>

      {/* Category Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Name */}
          <div>
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="category_name"
              {...formik.getFieldProps("category_name")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.category_name && formik.errors.category_name && (
              <p className="text-red-500 text-sm">{formik.errors.category_name}</p>
            )}
          </div>

          {/* Additional Fee Rate */}
          <div>
            <label className="block text-gray-700">Additional Fee Rate</label>
            <input
              type="number"
              name="additionalFeeRate"
              {...formik.getFieldProps("additionalFeeRate")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.additionalFeeRate && formik.errors.additionalFeeRate && (
              <p className="text-red-500 text-sm">{formik.errors.additionalFeeRate}</p>
            )}
          </div>

          {/* Additional Fee Amount */}
          <div>
            <label className="block text-gray-700">Additional Fee Amount</label>
            <input
              type="number"
              name="additionalFeeAmount"
              {...formik.getFieldProps("additionalFeeAmount")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.additionalFeeAmount && formik.errors.additionalFeeAmount && (
              <p className="text-red-500 text-sm">{formik.errors.additionalFeeAmount}</p>
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
          {loading ? "Adding..." : "Add Customer Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCustomerCategory;
