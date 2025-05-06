import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../Redux/BookingSlice"; // Adjust the import path for your Redux slice
import { Table, Button, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.booking);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    if (bookings.length > 0) {
      setAllBookings(bookings);
    }
  }, [bookings]);

 
  const handleAddBookingClick = () => {
    window.location.href = "/create-booking";
  };

  const loadMoreBookings = () => {
    if (!loading) {
      const totalItems = allBookings.length;
      const currentlyShown = currentPage * itemsPerPage;

      if (currentlyShown >= totalItems) return;

      setLoading(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        setLoading(false);
      }, 500);
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) loadMoreBookings();
  };

  if (status === "loading" && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Apply filter before slicing for pagination
  const filteredBookings = allBookings.filter((booking) =>
    booking.bookingid
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const bookingsToShow = filteredBookings.slice(0, currentPage * itemsPerPage);

  return (
    <div
      className="container my-3"
      onScroll={handleScroll}
      style={{ overflowY: "auto", height: "95vh" }}
    >
      <h2>Bookings Dashboard</h2>
      <Button
        variant="success"
        onClick={handleAddBookingClick}
        className="mb-3"
      >
        Add Booking
      </Button>

      {/* Booking ID Filter */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search Booking ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingsToShow.map((booking) => (
            <tr key={booking.bookingid}>
              <td>{booking.bookingid}</td>
              <td>
  <div className="d-flex gap-2">
    <Link to={`/booking-details/${booking.bookingid}`}>
      <Button variant="outline-success">View Details</Button>
    </Link>

    <Link to={`/edit-booking/${booking.bookingid}`}>
      <Button variant="info">Edit</Button>
    </Link>
  
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </Table>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
