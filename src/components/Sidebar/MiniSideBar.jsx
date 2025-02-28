import React, { useState } from 'react'
import {Bed, Box, ChevronDown, LucideWandSparkles, Menu} from 'lucide-react'
import { MdOutlineCleaningServices, MdOutlineTableBar } from 'react-icons/md'
import { TbCategory, TbFridge } from 'react-icons/tb'
import { CgNotes } from 'react-icons/cg'
import { FiUser } from 'react-icons/fi'
import { IoIosPeople } from 'react-icons/io'
import { FaRegCircle, FaRegMoneyBill1 } from 'react-icons/fa6'
import { GrUserSettings } from 'react-icons/gr'

const MiniSidebar = () => {

  const [isDropDownOpen, setIsDropDownOpen] = useState('');
  const [isSideBar, setIsSideBar] = useState(false)

  return (
    <div className={`lg:hidden duration-200  fixed bg-white z-50 ${isSideBar ? 'w-[250px]' : 'w-[50px] h-[50px]'}`} onClick={() => setIsSideBar(!isSideBar)}>

      {/* Header */}
      <div className='w-full h-[50px] flex items-center border justify-between px-4'>
        <h1 className={`font-bold font-overpass text-xl ${!isSideBar && 'w-[0px] overflow-hidden'}`}>Syntax<span className='font-normal text-purple-600'>Hotel</span></h1>
        <Menu className='size-5' />
      </div>

      {/* Navs */}
      <div className={`border p-6 scrollbar-none hover:scrollbar-thin overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-zinc-300/0 ${isSideBar ? 'w-full h-[94vh]' : 'h-[0vh] hidden'}`}>

        {/* Dashboard */}
        <div className='w-full'>
          <h1 className='sidebar-main'>Main</h1>
          <ul className='sidebar-nav group'>
            <Box className='sidebar-icon' />
            <li className='sidebar-item'>Dashboard</li>
          </ul>
        </div>

        {/* Hotel Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Hotel Management</h1>
          <ul className='sidebar-nav group'>
            <Bed className='sidebar-icon' />
            <li className='sidebar-item'>Rooms</li>
          </ul>
          <ul className='sidebar-nav group'>
            <MdOutlineTableBar className='sidebar-icon' />
            <li className='sidebar-item'>Tables</li>
          </ul>
          <ul className='sidebar-nav group'>
            <TbFridge className='sidebar-icon' />
            <li className='sidebar-item'>Inventory</li>
          </ul>
          <ul className='sidebar-nav group'>
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
              <li className='sidebar-dropdown-item'><FaRegCircle className='size-2 mb-1' /> Room Types</li>
              <li className='sidebar-dropdown-item'><FaRegCircle className='size-2 mb-1' />Table Types</li>
          </ul>
        </div>

        {/* Customer Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Customer Management</h1>
          <ul className='sidebar-nav group'>
            <FiUser className='sidebar-icon' />
            <li className='sidebar-item'>Customers</li>
          </ul>
          <ul className='sidebar-nav group'>
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
              <li className='sidebar-dropdown-item'><FaRegCircle className='size-2 mb-1' />Customer Category</li>
          </ul>
        </div>

        {/* Bookings Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Booking Management</h1>
          <ul className='sidebar-nav group'>
            <Bed className='sidebar-icon' />
            <li className='sidebar-item'>Room Bookings</li>
          </ul>
          <ul className='sidebar-nav group'>
            <MdOutlineTableBar className='sidebar-icon' />
            <li className='sidebar-item'>Table Bookings</li>
          </ul>
          <ul className='sidebar-nav group'>
            <CgNotes className='sidebar-icon' />
            <li className='sidebar-item'>Booking Notes</li>
          </ul>
        </div>

        {/* Staff Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Staff Management</h1>
          <ul className='sidebar-nav group'>
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
              <li className='sidebar-dropdown-item'><FaRegCircle className='size-2 mb-1' />Positions</li>
          </ul>
        </div>

        {/* Services Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Extra Services</h1>
          <ul className='sidebar-nav group'>
            <Box className='sidebar-icon' />
            <li className='sidebar-item'>Service Orders</li>
          </ul>
          <ul className='sidebar-nav group'>
            <LucideWandSparkles className='sidebar-icon' />
            <li className='sidebar-item'>Services</li>
          </ul>
        </div>

        {/* House Management */}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Housekeeping Management</h1>
          <ul className='sidebar-nav group'>
            <MdOutlineCleaningServices className='sidebar-icon' />
            <li className='sidebar-item'>Housekeeping</li>
          </ul>
        </div>

        {/* Administrations*/}
        <div className='w-full mt-4'>
          <h1 className='sidebar-main'>Administrations</h1>
          <ul className='sidebar-nav group'>
            <FaRegMoneyBill1 className='sidebar-icon' />
            <li className='sidebar-item'>Invoices</li>
          </ul>
          <ul className='sidebar-nav group'>
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
              <li className='sidebar-dropdown-item'><FaRegCircle className='size-2 mb-1' />User Roles</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MiniSidebar