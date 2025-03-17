import React, { useState } from 'react'
import MiniSidebar from '../Sidebar/MiniSideBar'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../HomePages/Dashboard/Dashboard'
import Rooms from '../HomePages/HotelManagement//Rooms/Rooms'
import Tables from '../HomePages/HotelManagement/Tables/Tables'
import TableTypes from '../HomePages//HotelManagement//Tables/TableTypes'
import RoomTypes from '../HomePages/HotelManagement/Rooms/RoomTypes'
import Inventory from '../HomePages/HotelManagement/Inventory/Inventory'
import HotelNotes from '../HomePages/HotelManagement/Notes/HotelNotes'
import Customers from '../HomePages/CustomerManagement/Customers/Customers'
import CustomerCategory from '../HomePages/CustomerManagement/Customers/CustomerCategory'
import CustomerNotes from '../HomePages/CustomerManagement/Notes/CustomerNotes'
import RoomBookings from '../HomePages/BookingManagement/RoomBooking/RoomBookings'
import TableBookings from '../HomePages/BookingManagement/TableBooking/TableBookings'
import BookingNotes from '../HomePages/BookingManagement/BookingNotes/BookingNotes'
import Staff from '../HomePages/StaffManagement/Staff/Staff'
import StaffPositions from '../HomePages/StaffManagement/Staff/StaffPositions'
import ServiceOrders from '../HomePages/ExtraServices/Services/ServiceOrders'
import Services from '../HomePages/ExtraServices/Services/Services'
import Housekeeping from '../HomePages/HousekeepingManagement/Housekeeping/Housekeeping'
import Invoices from '../HomePages/Administrations/Invoices/Invoices'
import Users from '../HomePages/Administrations/Users/Users'
import UserRoles from '../HomePages/Administrations/Users/UserRoles'
import Reports from '../HomePages/Reports/Reports/Reports'
import AddCustomers from '../HomePages/CustomerManagement/Customers/AddCustomers'
import AddCustomerCategory from '../HomePages/CustomerManagement/Customers/AddCustomerCategory'
import BillingAndCheckout from '../HomePages/BillingAndCheckout/BillingAndCheckout'

const Index = () => {

  const [activePage, setActivePage] = useState('dashboard') 

  return (
    <div className='max-w-screen max-h-screen overflow-hidden'>
        <div className='w-full h-full flex'>
            {/* Sidebars */}
            <div className='h-full lg:hidden'>
                <MiniSidebar activePage={activePage} setActivePage={setActivePage} />
            </div>
            <div className='w-[280px] h-full hidden lg:block'>
                <Sidebar activePage={activePage}  setActivePage={setActivePage} />
            </div>

            {/* main content */}
            <div className='w-full h-full overflow-y-auto'>
              {activePage === 'dashboard' && <Dashboard />}
              {activePage === 'billing' && <BillingAndCheckout />}
              {activePage === 'rooms' && <Rooms />}
              {activePage === 'tables' && <Tables />}
              {activePage === 'table-types' && <TableTypes />}
              {activePage === 'room-types' && <RoomTypes />}
              {activePage === 'inventory' && <Inventory />}
              {activePage === 'hotel-notes' && <HotelNotes />}
              {activePage === 'customers' && <Customers setActivePage={setActivePage} />}
              {activePage === 'customer-category' && <CustomerCategory setActivePage={setActivePage}  />}
              {activePage === 'customer-notes' && <CustomerNotes />}
              {activePage === 'room-bookings' && <RoomBookings />}
              {activePage === 'table-bookings' && <TableBookings />}
              {activePage === 'booking-notes' && <BookingNotes />}
              {activePage === 'staff' && <Staff />}
              {activePage === 'staff-positions' && <StaffPositions />}
              {activePage === 'service-orders' && <ServiceOrders />}
              {activePage === 'services' && <Services />}
              {activePage === 'housekeeping' && <Housekeeping />}
              {activePage === 'invoices' && <Invoices />}
              {activePage === 'users' && <Users />}
              {activePage === 'user-roles' && <UserRoles />}
              {activePage === 'reports' && <Reports />}
              {activePage === 'add-customers' && <AddCustomers />}
              {activePage === 'add-customer-categories' && <AddCustomerCategory />}
            </div>
        </div>
    </div>
  )
}

export default Index