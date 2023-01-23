import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import HomePage from './Pages/user/Home';
import Rooms from './Pages/user/Rooms';
import Gallery from './Pages/user/Gallery';
import Booking from './Pages/user/Booking';
import Register from './Pages/user/Register'
import AdminLogin from './Pages/admin/Login'
import AdminHome from './Pages/admin/Home'
import ResetPassword from './components/ADMIN/login/ResetPassword'
import AdminUsers from './Pages/admin/Users'
import AdminBooking from './Pages/admin/Booking'
import AdminServices from './Pages/admin/Services'
import Payment from './Pages/user/Payment'

const App = () => {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/rooms" element={<Rooms/>} />
            <Route exact path="/gallery" element={<Gallery/>} />
            <Route exact path="/booking" element={<Booking/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/proceed" element={<Payment/>} />
          </Routes>
  
        <Routes>
            <Route exact path="/admin/login" element={<AdminLogin/>} />
            <Route exact path="/admin" element={<AdminHome/>} />
            <Route exact path="/admin/resetpass/:token" element={<ResetPassword/>} />
            <Route exact path="/admin/users" element={<AdminUsers/>} />
            <Route exact path="/admin/booking" element={<AdminBooking/>} />
            <Route exact path="/admin/services" element={<AdminServices/>} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

