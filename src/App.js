import Index from "./components/FullScreen/Index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import EditCustomerCategory from "./components/HomePages/CustomerManagement/Customers/EditCustomerCategory";
import EditCustomers from "./components/HomePages/CustomerManagement/Customers/EditCustomers";
import AddRooms from "./components/HomePages/HotelManagement/Rooms/AddRooms";
import AddRoomTypes from "./components/HomePages/HotelManagement/Rooms/AddRoomTypes";
import EditRooms from "./components/HomePages/HotelManagement/Rooms/EditRooms";
import EditRoomType from "./components/HomePages/HotelManagement/Rooms/EditRoomType";
import AddTableTypes from "./components/HomePages/HotelManagement/Tables/AddTableTypes";
import EditTableTypes from "./components/HomePages/HotelManagement/Tables/EditTableTypes";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/edit-customer-category/:categoryID' element={<EditCustomerCategory/>} />
          <Route path='/edit-customer/:customerID' element={<EditCustomers/>} />
          <Route path='/add-room' element={<AddRooms/>} />
          <Route path='/add-room-types' element={<AddRoomTypes/>} />
          <Route path='/edit-room/:roomID' element={<EditRooms/>} />
          <Route path='/edit-room-type/:roomTypeID' element={<EditRoomType />} />
          <Route path='/add-table-types' element={<AddTableTypes />} />
          <Route path='/edit-table-type/:tableTypeID' element={<EditTableTypes />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
