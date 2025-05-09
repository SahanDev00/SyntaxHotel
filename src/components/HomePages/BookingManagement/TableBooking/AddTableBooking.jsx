import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CurrencyFormat from 'react-currency-format';

const AddTableBooking = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [hasFetchedTotalPrice, setHasFetchedTotalPrice] = useState(false);
  
    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/customers?Status=Active`, {
            headers: {
              APIkey: process.env.REACT_APP_APIKey
            }
          });
    
          setCustomers(response.data);
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchCustomers();
    }, []);

    useEffect(() => {
        const fetchTables = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/tables?Status=Available`, {
              headers: {
                APIkey: process.env.REACT_APP_APIKey
              }
            });
      
            setTables(response.data);
          } catch (err) {
            console.log(err);
          }
        };
      
        fetchTables();
      }, []);

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    CustomerID: Yup.string().required("Customer is required"),
    tableID: Yup.number().required("Table is required"),
    CheckInDate: Yup.date().required("Check-in time is required"),
    CheckOutDate: Yup.date().required("Check-out time is required"),
    TotalPrice: Yup.number().required("Total price is required"),
    PaidPrice: Yup.number().nullable(),
    StaffID: Yup.number().required("Staff ID is required"),
    PaymentMethod: Yup.string().required("Payment method is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      BookingID: null,
      CustomerID: "",
      tableID: "",
      CheckInDate: "",
      CheckOutDate: "",
      BookingStatus: "Booked",
      TotalPrice: "",
      PaidStatus: "Pending",
      PaidPrice: 0,
      StaffID: "1",
      PaymentMethod: "Cash",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/booking/addtablebooking`,
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
          toast.success("Table booking added successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          formik.resetForm();
        }
      } catch (err) {
        toast.error("Failed to add table booking");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  
  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/booking/totalprice?CustomerID=${formik.values.CustomerID}&tableID=${formik.values.tableID}&CheckInDate=${formik.values.CheckInDate}&CheckOutDate=${formik.values.CheckOutDate}`, {
            headers: {
              APIkey: process.env.REACT_APP_APIKey
            }
          });          

        // Update the TotalPrice field in Formik form using setFieldValue
        if (response.data && response.data.length > 0) {
            formik.setFieldValue("TotalPrice", response.data[0].TotalPrice);
        }
      } catch (err) {
        console.log(err);
      }
    };

      // Only call fetchTotalPrice if necessary fields are selected
    if (formik.values.CustomerID && formik.values.tableID && formik.values.CheckInDate && formik.values.CheckOutDate && !hasFetchedTotalPrice) {
        fetchTotalPrice();
        setHasFetchedTotalPrice(true);
    }
  }, [formik.values.CustomerID, formik.values.tableID, formik.values.CheckInDate, formik.values.CheckOutDate, formik, hasFetchedTotalPrice]);

  useEffect(() => {
    // Whenever any of the formik values change, reset `hasFetchedTotalPrice` to false
    if (
      formik.values.CustomerID ||
      formik.values.tableID ||
      formik.values.CheckInDate ||
      formik.values.CheckOutDate
    ) {
      setHasFetchedTotalPrice(false);
    }
  }, [formik.values.CustomerID, formik.values.tableID, formik.values.CheckInDate, formik.values.CheckOutDate]);  

  return (
    <div className="p-6 min-h-screen font-overpass">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Add Table Booking</h1>
      </div>

      {/* table Booking Form */}
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer ID */}
          <div>
            <label className="block text-gray-700">Customer</label>
            <select
              name="CustomerID"
              value={formik.values.CustomerID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1 text-black"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.CustomerID} value={customer.CustomerID}>
                  {customer.full_name}
                </option>
              ))}
            </select>
            {formik.touched.CustomerID && formik.errors.CustomerID && (
              <p className="text-red-500 text-sm">{formik.errors.CustomerID}</p>
            )}
          </div>

        {/* Table ID */}
        <div>
        <label className="block text-gray-700">Table</label>
        {tables.length > 0 ? (
            <select
            name="tableID"
            value={formik.values.tableID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded mt-1 text-black"
            >
            <option value="">Select a Table</option>
            {tables.map((table) => (
                <option key={table.tableID} value={table.tableID}>
                {table.table_number}
                </option>
            ))}
            </select>
        ) : (
            <input type="text" className="w-full p-2 border rounded mt-1 text-red-500 outline-none cursor-not-allowed" readOnly placeholder="All Tables Are Occupied" />
        )}
        {formik.touched.tableID && formik.errors.tableID && (
            <p className="text-red-500 text-sm">{formik.errors.tableID}</p>
        )}
        </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-gray-700">Check-in Date</label>
            <input
              type="date"
              name="CheckInDate"
              {...formik.getFieldProps("CheckInDate")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.CheckInDate && formik.errors.CheckInDate && (
              <p className="text-red-500 text-sm">{formik.errors.CheckInDate}</p>
            )}
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-gray-700">Check-out Date</label>
            <input
              type="date"
              name="CheckOutDate"
              {...formik.getFieldProps("CheckOutDate")}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.CheckOutDate && formik.errors.CheckOutDate && (
              <p className="text-red-500 text-sm">{formik.errors.CheckOutDate}</p>
            )}
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-gray-700">Total Price (Rs.)</label>
            <CurrencyFormat
                name="TotalPrice"
                readOnly
                value={formik.values.TotalPrice}
                {...formik.getFieldProps("TotalPrice")}
                className="w-full p-2 border rounded mt-1 outline-none text-gray-700"
                thousandSeparator={true}
                onValueChange={(values) => {
                formik.setFieldValue('TotalPrice', values.value); // Sets the raw value (without formatting)
                }}
            />
            {formik.touched.TotalPrice && formik.errors.TotalPrice && (
              <p className="text-red-500 text-sm">{formik.errors.TotalPrice}</p>
            )}
          </div>

          {/* Paid Price */}
          <div>
            <label className="block text-gray-700">Paid Price (Rs.)</label>
            <CurrencyFormat
                name="PaidPrice"
                value={formik.values.PaidPrice}
                {...formik.getFieldProps("PaidPrice")}
                className="w-full p-2 border rounded mt-1"
                thousandSeparator={true}
                onValueChange={(values) => {
                formik.setFieldValue('PaidPrice', values.value); // Sets the raw value (without formatting)
                }}
            />
            {formik.touched.PaidPrice && formik.errors.PaidPrice && (
              <p className="text-red-500 text-sm">{formik.errors.PaidPrice}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="PaymentMethod"
              {...formik.getFieldProps("PaymentMethod")}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
            {formik.touched.PaymentMethod && formik.errors.PaymentMethod && (
              <p className="text-red-500 text-sm">{formik.errors.PaymentMethod}</p>
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
          {loading ? "Adding..." : "Add Booking"}
        </button>
      </form>
    </div>
  );
};

export default AddTableBooking;
