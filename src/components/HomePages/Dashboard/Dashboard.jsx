import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
import { FiBell } from 'react-icons/fi'
import axios from 'axios'

const Dashboard = () => {

  const [newCustomersCount, setNewCustomersCount] = useState('');
  const [newOrdersCount, setNewOrdersCount] = useState('');
  const [availableRoomsCount, setAvailableRoomsCount] = useState('');
  const [availableTablesCount, setAvailableTablesCount] = useState('');
  const [pendingPaymentsCount, setPendingPaymentsCount] = useState('');
  const [monthlySales, setMonthlySales] = useState([]);
  const [customerGrowth, setCustomerGrowth] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);

  useEffect(() => {
    const fetchNewCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers/count`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setNewCustomersCount(response.data[0].Count)
    }
    fetchNewCustomers();
  }, [])

  useEffect(() => {
    const fetchNewOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/services/count`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setNewOrdersCount(response.data[0].Count)
    }
    fetchNewOrders();
  }, [])

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/availablerooms`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setAvailableRoomsCount(response.data[0].Count)
    }
    fetchAvailableRooms();
  }, [])

  useEffect(() => {
    const fetchAvailableTables = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hotel/availabletables`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setAvailableTablesCount(response.data[0].Count)
    }
    fetchAvailableTables();
  }, [])
  
  useEffect(() => {
    const fetchPendingPayments = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/booking/pendingcounts`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setPendingPaymentsCount(response.data[0].Count)
    }
    fetchPendingPayments();
  }, [])

  useEffect(() => {
    const fetchMonthlySales = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/charts/monthlysales`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setMonthlySales(response.data)
    }
    fetchMonthlySales();
  }, []) 

  useEffect(() => {
    const fetchCustomerGrowth = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/charts/customergrowth`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setCustomerGrowth(response.data)
    }
    fetchCustomerGrowth();
  }, [])

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/charts/upcommingevents`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setUpcomingEvents(response.data)
    }
    fetchUpcomingEvents();
  }, [])

  useEffect(() => {
    const fetchUpcomingReservations = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/booking/upcomingreservations`, {
        headers: {
          APIkey: process.env.REACT_APP_APIKey
        }
      })
      setUpcomingReservations(response.data)
    }
    fetchUpcomingReservations();
  }, [])


  // Dummy Data for Notifications
  const notifications = [
    { type: 'New Booking', message: 'New booking from Sarah Williams for Room 402', date: '2025-03-07' },
    { type: 'Room Service', message: 'Room 203 requested extra towels', date: '2025-03-06' },
    { type: 'Maintenance Request', message: 'AC malfunction in Room 305', date: '2025-03-05' }
  ]

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className='p-6 bg-gray-50 h-screen overflow-y-auto font-overpass scrollbar-none hover:scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-zinc-300/0'>
      {/* Dashboard Header */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl mt-[45px] lg:mt-0 mb-6'>Welcome to <span className='text-purple-600'>Dashboard</span></h1>
        <div className='relative'>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className='text-gray-700 p-2 mt-5 md:mt-0 rounded-full hover:bg-gray-200'
          >
            <FiBell size={24} />
          </button>
          {showNotifications && (
            <div className='absolute right-0 mt-2 w-72 bg-white shadow rounded-md p-4 z-50'>
              <h2 className='font-semibold text-lg'>Notifications</h2>
              <ul className='space-y-2 mt-3'>
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className='p-2 bg-purple-100 rounded flex justify-between items-center'
                  >
                    <div>
                      <p className='font-semibold'>{notification.type}</p>
                      <p className='text-sm'>{notification.message}</p>
                    </div>
                    <span className='text-xs text-gray-500'>{notification.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          <div className={`p-6 bg-yellow-50 rounded shadow`}>
            <h2 className='font-semibold text-gray-900'>New Customers</h2>
            <p className='text-3xl font-bold text-gray-700'>{newCustomersCount}</p>
          </div>
          <div className={`p-6 bg-orange-50 rounded shadow`}>
            <h2 className='font-semibold text-gray-900'>New Orders</h2>
            <p className='text-3xl font-bold text-gray-700'>{newOrdersCount}</p>
          </div>
          <div className={`p-6 bg-purple-50 rounded shadow`}>
            <h2 className='font-semibold text-gray-900'>Available Rooms</h2>
            <p className='text-3xl font-bold text-gray-700'>{availableRoomsCount}</p>
          </div>
          <div className={`p-6 bg-red-50 rounded shadow`}>
            <h2 className='font-semibold text-gray-900'>Available Tables</h2>
            <p className='text-3xl font-bold text-gray-700'>{availableTablesCount}</p>
          </div>
          <div className={`p-6 bg-red-100 rounded shadow`}>
            <h2 className='font-semibold text-gray-900'>Pending Payments</h2>
            <p className='text-3xl font-bold text-gray-700'>{pendingPaymentsCount}</p>
          </div>
      </div>

      {/* Revenue Chart */}
      <div className='bg-white p-6 mt-8 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Monthly Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{ fontSize: 12 }} dataKey="month" />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#6B21A8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Growth Chart & Upcoming Events - Side by Side */}
      <div className='grid grid-cols-2 gap-6 mt-8'>

        <div className='bg-white p-6 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4'>Customer Growth Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={{ fontSize: 12 }} dataKey="month" />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="newCustomers" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Smaller Upcoming Events */}
        <div className='bg-white p-6 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>
          <ul className='space-y-2'>
            {upcomingEvents.length !== 0 ? (
              upcomingEvents.map((event, index) => (
                <li key={index} className='p-3 bg-purple-100 rounded-md'>
                  <span className='font-semibold'>{event.date}:</span> {event.event}
                </li>
              ))
            ) : (
              <p className='text-sm text-gray-500'>No Upcoming Events</p>
            )}
          </ul>
        </div>
      </div>

      {/* Upcoming Reservations */}
      <div className='bg-white p-6 mt-8 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Upcoming Reservations</h2>
        <ul className='space-y-2'>
          {upcomingReservations.length !== 0 ? (
            upcomingReservations.map((reservation, index) => (
              <li key={index} className='p-3 bg-gray-100 rounded-md'>
                {reservation.room_number === null && (
                  <li><span className='font-semibold'>{reservation.full_name}</span> - Table {reservation.table_number} at {reservation.check_in_date}</li>
                )}
                {reservation.table_number === null && (
                  <li><span className='font-semibold'>{reservation.full_name}</span> - Room {reservation.room_number} at {reservation.check_in_date}</li>
                )} 
              </li>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No Upcoming Reservations</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
