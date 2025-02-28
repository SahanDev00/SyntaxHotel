import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { FiBell } from 'react-icons/fi'

const Dashboard = () => {
  // Dummy Data for Revenue Chart
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3200 },
    { month: 'Mar', revenue: 4500 },
    { month: 'Apr', revenue: 5000 },
    { month: 'May', revenue: 4800 },
    { month: 'Jun', revenue: 6000 },
    { month: 'Jul', revenue: 5200 },
    { month: 'Aug', revenue: 5800 },
    { month: 'Sep', revenue: 6200 },
    { month: 'Oct', revenue: 6800 },
    { month: 'Nov', revenue: 7000 },
    { month: 'Dec', revenue: 7500 }
  ]

  // Dummy Data for Monthly Sales
  const salesData = [
    { month: 'Jan', sales: 3000 },
    { month: 'Feb', sales: 2800 },
    { month: 'Mar', sales: 3500 },
    { month: 'Apr', sales: 4200 },
    { month: 'May', sales: 4600 },
    { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 5200 },
    { month: 'Aug', sales: 5800 },
    { month: 'Sep', sales: 6200 },
    { month: 'Oct', sales: 6800 },
    { month: 'Nov', sales: 7000 },
    { month: 'Dec', sales: 7500 }
  ]

  // Dummy Data for Stats
  const stats = [
    { title: 'New Customers', count: 128, color: 'bg-yellow-50' },
    { title: 'New Orders', count: 76, color: 'bg-orange-50' },
    { title: 'Available Rooms', count: 18, color: 'bg-purple-50' },
    { title: 'Available Tables', count: 22, color: 'bg-red-50' }
  ]

  // Dummy Data for Upcoming Events
  const upcomingEvents = [
    { date: '2025-03-10', event: 'Annual Business Meeting' },
    { date: '2025-03-15', event: 'VIP Customer Event' },
    { date: '2025-03-20', event: 'Staff Training Workshop' }
  ]

  // Dummy Data for Upcoming Reservations
  const reservations = [
    { name: 'John Doe', table: 3, time: '2025-03-12 7:00 PM' },
    { name: 'Jane Smith', table: 5, time: '2025-03-14 6:30 PM' },
    { name: 'Bill Gates', table: 1, time: '2025-03-16 8:00 PM' }
  ]

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
            <div className='absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md p-4 z-50'>
              <h2 className='font-semibold text-lg'>Notifications</h2>
              <ul className='space-y-2 mt-3'>
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className='p-2 bg-purple-100 rounded-md flex justify-between items-center'
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
        {stats.map((stat, index) => (
          <div key={index} className={`p-6 ${stat.color} text-gray-700 rounded-xl shadow`}>
            <h2 className='font-semibold text-gray-800'>{stat.title}</h2>
            <p className='text-3xl font-bold text-gray-900'>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className='bg-white p-6 mt-8 rounded-xl shadow'>
        <h2 className='text-xl font-semibold mb-4'>Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{ fontSize: 12 }} dataKey="month" />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#6B21A8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Sales Chart & Upcoming Events - Side by Side */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
        {/* Bigger Monthly Sales Chart */}
        <div className='md:col-span-2 bg-white p-6 rounded-xl shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Monthly Sales</h2>
          <div className='w-full flex'>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis tick={{ fontSize: 12 }} dataKey="month" />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#6B21A8" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smaller Upcoming Events */}
        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>
          <ul className='space-y-2'>
            {upcomingEvents.map((event, index) => (
              <li key={index} className='p-3 bg-purple-100 rounded-md'>
                <span className='font-semibold'>{event.date}:</span> {event.event}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upcoming Reservations */}
      <div className='bg-white p-6 mt-8 rounded-xl shadow'>
        <h2 className='text-xl font-semibold mb-4'>Upcoming Reservations</h2>
        <ul className='space-y-2'>
          {reservations.map((reservation, index) => (
            <li key={index} className='p-3 bg-gray-100 rounded-md'>
              <span className='font-semibold'>{reservation.name}</span> - Table {reservation.table} at {reservation.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
