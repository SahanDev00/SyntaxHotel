import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Invoices = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payments/payments`, {
          headers: {
            APIkey: process.env.REACT_APP_APIKey
          }
        });
        setInvoiceData(response.data);

        // Fetch customer name for each invoice
        const customerNamePromises = response.data.map(async (invoice) => {
          const customerResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/customerbybookingid?BookingID=${invoice.bookingID}`, {
            headers: {
              APIkey: process.env.REACT_APP_APIKey
            }
          });
          return { [invoice.bookingID]: customerResponse.data };  // store customer data by bookingID
        });

        const customerData = await Promise.all(customerNamePromises);
        const customerNamesObj = customerData.reduce((acc, data) => {
          return { ...acc, ...data };
        }, {});

        setCustomerNames(customerNamesObj);

      } catch (err) {
        console.error(err);
      }
    };
    fetchInvoices();
  }, []);

  // Filter data based on the selected date
  const handleFilterDate = () => {
    const filteredInvoices = invoiceData.filter((invoice) => {
      const paymentDate = new Date(invoice.paymentDate);
      const filterDateObj = new Date(filterDate);
      return paymentDate.toDateString() === filterDateObj.toDateString();
    });
    setInvoiceData(filteredInvoices);
  };

  // Handle the Print button functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-screen p-10 bg-gray-50 font-overpass">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-5">
            Invoice Report
          </h2>
        <div className="flex items-center space-x-2">
          <label className="font-semibold text-gray-700">Filter by Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-md text-sm"
          />
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm"
          >
            Print Invoice Report
          </button>
          <button
            onClick={handleFilterDate}
            className="px-5 py-2 bg-gray-600 text-white font-semibold text-sm"
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className="w-full h-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left text-black font-medium">Invoice ID</th>
              <th className="py-3 px-4 text-left text-black font-medium">Customer Name</th>
              <th className="py-3 px-4 text-left text-black font-medium">Booking ID</th>
              <th className="py-3 px-4 text-left text-black font-medium">Amount</th>
              <th className="py-3 px-4 text-left text-black font-medium">Payment Method</th>
              <th className="py-3 px-4 text-left text-black font-medium">Status</th>
              <th className="py-3 px-4 text-left text-black font-medium">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice, index) => {
              const customerName = customerNames[invoice.bookingID]?.[0]?.full_name || "Unknown";

              return (
                <tr key={invoice.paymentID} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-300`}>
                  <td className="py-4 px-4 text-gray-700">{invoice.paymentID}</td>
                  <td className="py-4 px-4 text-gray-700">{customerName}</td>
                  <td className="py-4 px-4 text-gray-700">{invoice.bookingID}</td>
                  <td className="py-4 px-4 text-gray-700">${invoice.amount ? invoice.amount.toFixed(2) : 'N/A'}</td>
                  <td className="py-4 px-4 text-gray-700">{invoice.payment_method}</td>
                  <td className="py-4 px-4 text-gray-700">
                    <span
                      className={`${
                        invoice.status === "Pending"
                          ? "text-yellow-500"
                          : invoice.status === "Cancelled"
                          ? "text-red-500"
                          : "text-green-500"
                      } font-semibold`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{new Date(invoice.payment_date).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
