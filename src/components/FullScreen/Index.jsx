import React, { useState } from 'react'
import MiniSidebar from '../Sidebar/MiniSideBar'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../HomePages/Dashboard/Dashboard'
import Rooms from '../HomePages/Rooms/Rooms'
import Tables from '../HomePages/Tables/Tables'
import TableTypes from '../HomePages/Tables/TableTypes'
import RoomTypes from '../HomePages/Rooms/RoomTypes'
import Inventory from '../HomePages/HotelManagement/Inventory/Inventory'
import HotelNotes from '../HomePages/HotelManagement/Notes/HotelNotes'
import Customers from '../HomePages/CustomerManagement/Customers/Customers'
import CustomerCategory from '../HomePages/CustomerManagement/Customers/CustomerCategory'
import CustomerNotes from '../HomePages/CustomerManagement/Notes/CustomerNotes'

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
              {activePage === 'rooms' && <Rooms />}
              {activePage === 'tables' && <Tables />}
              {activePage === 'table-types' && <TableTypes />}
              {activePage === 'room-types' && <RoomTypes />}
              {activePage === 'inventory' && <Inventory />}
              {activePage === 'hotel-notes' && <HotelNotes />}
              {activePage === 'customers' && <Customers />}
              {activePage === 'customer-category' && <CustomerCategory />}
              {activePage === 'customer-notes' && <CustomerNotes />}
            </div>
        </div>
    </div>
  )
}

export default Index