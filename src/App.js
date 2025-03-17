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
import AddTables from "./components/HomePages/HotelManagement/Tables/AddTables";
import EditTables from "./components/HomePages/HotelManagement/Tables/EditTables";
import AddRoomBooking from "./components/HomePages/BookingManagement/RoomBooking/AddRoomBooking";
import EditRoomBooking from "./components/HomePages/BookingManagement/RoomBooking/EditRoomBooking";
import AddTableBooking from "./components/HomePages/BookingManagement/TableBooking/AddTableBooking";
import EditTableBooking from "./components/HomePages/BookingManagement/TableBooking/EditTableBooking";


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
          <Route path='/add-tables' element={<AddTables />} />
          <Route path='/add-table-types' element={<AddTableTypes />} />
          <Route path='/edit-table/:tableID' element={<EditTables />} />
          <Route path='/edit-table-type/:tableTypeID' element={<EditTableTypes />} />
          <Route path='/add-room-booking' element={<AddRoomBooking />} />
          <Route path='/edit-room-booking/:bookingID' element={<EditRoomBooking />} />
          <Route path='/add-table-booking' element={<AddTableBooking />} />
          <Route path='/edit-table-booking/:bookingID' element={<EditTableBooking />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
