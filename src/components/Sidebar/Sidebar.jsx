import React, { useState } from 'react'
import {Bed, Box, ChevronDown, LucideWandSparkles, Menu, ReceiptText} from 'lucide-react'
import { MdOutlineCleaningServices, MdOutlineTableBar } from 'react-icons/md'
import { TbCategory, TbFridge } from 'react-icons/tb'
import { CgNotes } from 'react-icons/cg'
import { FiUser } from 'react-icons/fi'
import { IoIosPeople } from 'react-icons/io'
import { FaRegCircle, FaRegMoneyBill1 } from 'react-icons/fa6'
import { GrUserSettings } from 'react-icons/gr'

const Sidebar = ({activePage, setActivePage }) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState('');

  return (
    <div className='w-full'>

      {/* Header */}
      <div className='w-full h-[6vh] flex items-center border justify-between px-6'>
        <h1 className='font-bold font-overpass text-2xl'>Syntax<span className='font-normal text-purple-600'>Hotel</span></h1>
        <Menu />
      </div>

      {/* Navs */}
      <div className='w-full border h-[94vh] p-6 scrollbar-none hover:scrollbar-thin overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-zinc-300/0'>

        {/* Dashboard */}
        <div className='w-full'>
          <h1 className='sidebar-main'>Main</h1>
          <ul className={`sidebar-nav group ${activePage === 'dashboard' && 'text-purple-700'}`} onClick={() => setActivePage('dashboard')}>
            <Box className='sidebar-icon' />
            <li className='sidebar-item'>Dashboard</li>
          </ul>
        </div>

        {/* Hotel Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Hotel Management</h1>
          <ul className={`sidebar-nav group ${activePage === 'rooms' && 'text-purple-700'}`} onClick={() => setActivePage('rooms')}>
            <Bed className='sidebar-icon' />
            <li className='sidebar-item'>Rooms</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'tables' && 'text-purple-700'}`} onClick={() => setActivePage('tables')}>
            <MdOutlineTableBar className='sidebar-icon' />
            <li className='sidebar-item'>Tables</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'inventory' && 'text-purple-700'}`} onClick={() => setActivePage('inventory')}>
            <TbFridge className='sidebar-icon' />
            <li className='sidebar-item'>Inventory</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'hotel-notes' && 'text-purple-700'}`} onClick={() => setActivePage('hotel-notes')}>
            <CgNotes className='sidebar-icon' />
            <li className='sidebar-item'>Hotel Notes</li>
          </ul>
          <ul className={`sidebar-toggle-nav group ${isDropDownOpen === 'HotelManagement' && 'text-purple-600'}`} onClick={() => (isDropDownOpen === 'HotelManagement' ? setIsDropDownOpen('') : setIsDropDownOpen('HotelManagement'))}>
            <div className='sidebar-toggle-div'>
              <TbCategory className='sidebar-icon' />
              <li className='sidebar-item'>Categorization</li>
            </div>
            <ChevronDown className={`sidebar-icon duration-200 ${isDropDownOpen === 'HotelManagement' && 'rotate-180'}`} />
          </ul>
          <ul className={`duration-200 overflow-hidden ${isDropDownOpen === 'HotelManagement' ? 'h-[50px]' : 'h-0'}`}>
              <li className={`sidebar-dropdown-item ${activePage === 'room-types' && 'text-purple-700'}`} onClick={() => setActivePage('room-types')}><FaRegCircle className='size-2 mb-1' /> Room Types</li>
              <li className={`sidebar-dropdown-item ${activePage === 'table-types' && 'text-purple-700'}`} onClick={() => setActivePage('table-types')}><FaRegCircle className='size-2 mb-1' />Table Types</li>
          </ul>
        </div>

        {/* Customer Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Customer Management</h1>
          <ul className={`sidebar-nav group ${activePage === 'customers' && 'text-purple-700'}`} onClick={() => setActivePage('customers')}>
            <FiUser className='sidebar-icon' />
            <li className='sidebar-item'>Customers</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'customer-notes' && 'text-purple-700'}`} onClick={() => setActivePage('customer-notes')}>
            <CgNotes className='sidebar-icon' />
            <li className='sidebar-item'>Customer Notes</li>
          </ul>
          <ul className={`sidebar-toggle-nav group ${isDropDownOpen === 'CustomerManagement' && 'text-purple-600'}`} onClick={() => (isDropDownOpen === 'CustomerManagement' ? setIsDropDownOpen('') : setIsDropDownOpen('CustomerManagement'))}>
            <div className='sidebar-toggle-div'>
              <TbCategory className='sidebar-icon' />
              <li className='sidebar-item'>Categorization</li>
            </div>
            <ChevronDown className={`sidebar-icon duration-200 ${isDropDownOpen === 'CustomerManagement' && 'rotate-180'}`} />
          </ul>
          <ul className={`duration-200 overflow-hidden ${isDropDownOpen === 'CustomerManagement' ? 'h-[30px]' : 'h-0'}`}>
              <li className={`sidebar-dropdown-item ${activePage === 'customer-category' && 'text-purple-700'}`} onClick={() => setActivePage('customer-category')}><FaRegCircle className='size-2 mb-1' />Customer Category</li>
          </ul>
        </div>

        {/* Bookings Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Booking Management</h1>
          <ul className={`sidebar-nav group ${activePage === 'room-bookings' && 'text-purple-700'}`} onClick={() => setActivePage('room-bookings')}>
            <Bed className='sidebar-icon' />
            <li className='sidebar-item'>Room Bookings</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'table-bookings' && 'text-purple-700'}`} onClick={() => setActivePage('table-bookings')}>
            <MdOutlineTableBar className='sidebar-icon' />
            <li className='sidebar-item'>Table Bookings</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'booking-notes' && 'text-purple-700'}`} onClick={() => setActivePage('booking-notes')}>
            <CgNotes className='sidebar-icon' />
            <li className='sidebar-item'>Booking Notes</li>
          </ul>
        </div>

        {/* Staff Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Staff Management</h1>
          <ul className={`sidebar-nav group ${activePage === 'staff' && 'text-purple-700'}`} onClick={() => setActivePage('staff')}>
            <IoIosPeople className='sidebar-icon' />
            <li className='sidebar-item'>Staff</li>
          </ul>
          <ul className={`sidebar-toggle-nav group ${isDropDownOpen === 'StaffManagement' && 'text-purple-600'}`} onClick={() => (isDropDownOpen === 'StaffManagement' ? setIsDropDownOpen('') : setIsDropDownOpen('StaffManagement'))}>
            <div className='sidebar-toggle-div'>
              <TbCategory className='sidebar-icon' />
              <li className='sidebar-item'>Categorization</li>
            </div>
            <ChevronDown className={`sidebar-icon duration-200 ${isDropDownOpen === 'StaffManagement' && 'rotate-180'}`} />
          </ul>
          <ul className={`duration-200 overflow-hidden ${isDropDownOpen === 'StaffManagement' ? 'h-[30px]' : 'h-0'}`}>
              <li className={`sidebar-dropdown-item ${activePage === 'staff-positions' && 'text-purple-700'}`} onClick={() => setActivePage('staff-positions')}><FaRegCircle className='size-2 mb-1' />Positions</li>
          </ul>
        </div>

        {/* Services Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Extra Services</h1>
          <ul className={`sidebar-nav group ${activePage === 'service-orders' && 'text-purple-700'}`} onClick={() => setActivePage('service-orders')}>
            <Box className='sidebar-icon' />
            <li className='sidebar-item'>Service Orders</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'services' && 'text-purple-700'}`} onClick={() => setActivePage('services')}>
            <LucideWandSparkles className='sidebar-icon' />
            <li className='sidebar-item'>Services</li>
          </ul>
        </div>

        {/* House Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Housekeeping Management</h1>
          <ul className={`sidebar-nav group ${activePage === 'housekeeping' && 'text-purple-700'}`} onClick={() => setActivePage('housekeeping')}>
            <MdOutlineCleaningServices className='sidebar-icon' />
            <li className='sidebar-item'>Housekeeping</li>
          </ul>
        </div>

        {/* Reports */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Reports</h1>
          <ul className={`sidebar-nav group ${activePage === 'reports' && 'text-purple-700'}`} onClick={() => setActivePage('reports')}>
            <ReceiptText className='sidebar-icon' />
            <li className='sidebar-item'>Reports</li>
          </ul>
        </div>

        {/* Administrations*/}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Administrations</h1>
          <ul className={`sidebar-nav group ${activePage === 'invoices' && 'text-purple-700'}`} onClick={() => setActivePage('invoices')}>
            <FaRegMoneyBill1 className='sidebar-icon' />
            <li className='sidebar-item'>Invoices</li>
          </ul>
          <ul className={`sidebar-nav group ${activePage === 'users' && 'text-purple-700'}`} onClick={() => setActivePage('users')}>
            <GrUserSettings className='sidebar-icon' />
            <li className='sidebar-item'>Users</li>
          </ul>
          <ul className={`sidebar-toggle-nav group ${isDropDownOpen === 'Administration' && 'text-purple-600'}`} onClick={() => (isDropDownOpen === 'Administration' ? setIsDropDownOpen('') : setIsDropDownOpen('Administration'))}>
            <div className='sidebar-toggle-div'>
              <TbCategory className='sidebar-icon' />
              <li className='sidebar-item'>Categorization</li>
            </div>
            <ChevronDown className={`sidebar-icon duration-200 ${isDropDownOpen === 'Administration' && 'rotate-180'}`} />
          </ul>
          <ul className={`duration-200 overflow-hidden ${isDropDownOpen === 'Administration' ? 'h-[50px]' : 'h-0'}`}>
              <li className={`sidebar-dropdown-item ${activePage === 'user-roles' && 'text-purple-700'}`} onClick={() => setActivePage('user-roles')}><FaRegCircle className='size-2 mb-1' />User Roles</li>
          </ul>
        </div>
      </div>
      <p className='fixed z-50 right-5 bottom-3 text-xs text-gray-600 font-karla'>&copy; {new Date().getFullYear()} Developed by <a target='_blank' href='https://syntaxwaresolutions.netlify.app' rel="noreferrer" className='text-purple-600'>Syntaxware Solutions</a></p>
    </div>
  )
}

export default Sidebar