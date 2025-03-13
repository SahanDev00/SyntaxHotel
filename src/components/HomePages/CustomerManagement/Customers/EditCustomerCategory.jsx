import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const EditCustomerCategory = () => {
  const [loading, setLoading] = useState(false);
  const { categoryID } = useParams();
  const [customerCategory, setCustomerCategory] = useState(null); // Store single category

  useEffect(() => {
    const fetchCustomerCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/category?CategoryID=${categoryID}`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
        setCustomerCategory(response.data); // Store the category details
        console.log(response.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomerCategory();
  }, [categoryID]);

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
      CategoryID: customerCategory?.[0].CategoryID || categoryID,
      category_name: customerCategory?.[0].category_name || "",
      additionalFeeRate: customerCategory?.[0].additionalFeeRate || 0,
      additionalFeeAmount: customerCategory?.[0].additionalFeeAmount || 0,
    },
    enableReinitialize: true, // Allows form to reinitialize when data is fetched
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
          });
        } else {
          toast.success("Customer Category updated successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (err) {
        toast.error("Failed to update Customer Category");
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Customer Category</h1>
      </div>

      {/* Show form only when category data is loaded */}
      {customerCategory ? (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 border">
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
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Customer Category"}
          </button>
        </form>
      ) : (
        <p>Loading customer category...</p>
      )}
    </div>
  );
};

export default EditCustomerCategory;
