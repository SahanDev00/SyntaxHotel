import React, { useState } from 'react'
import MiniSidebar from '../Sidebar/MiniSideBar'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../HomePages/Dashboard'
import Rooms from '../HomePages/Rooms'

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
            </div>
        </div>
    </div>
  )
}

export default Index