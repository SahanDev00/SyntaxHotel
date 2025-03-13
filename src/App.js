import Index from "./components/FullScreen/Index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import EditCustomerCategory from "./components/HomePages/CustomerManagement/Customers/EditCustomerCategory";
import EditCustomers from "./components/HomePages/CustomerManagement/Customers/EditCustomers";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/edit-customer-category/:categoryID' element={<EditCustomerCategory/>} />
          <Route path='/edit-customer/:customerID' element={<EditCustomers/>} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
