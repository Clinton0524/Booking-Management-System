import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById } from "../Redux/BookingSlice";
import { useParams } from "react-router-dom";
import { Card, Spinner, Table } from "react-bootstrap";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { selectedBooking, status, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingById(bookingId));
  }, [dispatch, bookingId]);

  if (status === "loading") {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-danger mt-3 text-center">Error: {error}</div>;
  }

  return (
    <div className="container my-4 d-flex ">
      {selectedBooking ? (
        <Card className="shadow p-3">
          <Card.Body>
            <Card.Title className="text-center mb-3 text-primary fs-4">
              Booking Details
            </Card.Title>
            <Table bordered hover responsive size="sm">
              <tbody>
                <tr>
                  <th>Booking ID</th>
                  <td>{selectedBooking.bookingid}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{selectedBooking.firstname}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{selectedBooking.lastname}</td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td>{selectedBooking.totalprice}</td>
                </tr>
                <tr>
                  <th>Deposit Paid</th>
                  <td>{selectedBooking.depositpaid ? "true" : "false"}</td>
                </tr>
                <tr>
                  <th>Additional Needs</th>
                  <td>{selectedBooking.additionalneeds}</td>
                </tr>
                <tr>
                  <th>Check-in</th>
                  <td>{selectedBooking.bookingdates?.checkin}</td>
                </tr>
                <tr>
                  <th>Check-out</th>
                  <td>{selectedBooking.bookingdates?.checkout}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : (
        <div className="text-muted">No booking details available.</div>
      )}
    </div>
  );
};

export default BookingDetails;
