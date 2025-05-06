// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import BookingDetails from "./Components/BookingDetails"
import Sidebar from "./Components/Sidebar"
import CreateBooking from "./Components/CreateBooking";

const App = () => (
  <Router>
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-8 ">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-booking" element={<CreateBooking />} />
            <Route path="/booking-details/:bookingId" element={<BookingDetails />}/>
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
