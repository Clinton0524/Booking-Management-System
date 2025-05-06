import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form,Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../Redux/BookingSlice';

const initialForm = {
  firstname: '',
  lastname: '',
  totalprice: '',
  depositpaid: false,
  checkin: '',
  checkout: '',
  additionalneeds: '',
};

const CreateBooking = () => {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const { firstname, lastname, totalprice, checkin, checkout, additionalneeds } = form;
    if (!firstname || !lastname || !totalprice || !checkin || !checkout || !additionalneeds) {
      return 'Please fill in all the required fields.';
    }
    if (isNaN(totalprice) || totalprice <= 0) {
      return 'Total price must be a positive number.';
    }
    if (new Date(checkin) > new Date(checkout)) {
      return 'Check-out date cannot be earlier than check-in date.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }

    const bookingData = {
      firstname: form.firstname,
      lastname: form.lastname,
      totalprice: Number(form.totalprice),
      depositpaid: form.depositpaid,
      bookingdates: {
        checkin: form.checkin,
        checkout: form.checkout,
      },
      additionalneeds: form.additionalneeds,
    };

    const result = await dispatch(createBooking(bookingData));
    
    if (createBooking.fulfilled.match(result)) {
      alert('Booking created successfully!');
      navigate('/dashboard');
    } else {
      setFormError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="container my-4">
      <div className='col-6'>
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 text-center text-primary fs-4">
            Create Booking
          </Card.Title>
  
          {formError && <div className="alert alert-warning">{formError}</div>}
  
          <Form onSubmit={handleSubmit}>
            {['firstname', 'lastname', 'totalprice', 'additionalneeds'].map((field) => (
              <Form.Group controlId={field} key={field} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type={field === 'totalprice' ? 'number' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
  
            <Form.Group controlId="depositpaid" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Deposit Paid"
                name="depositpaid"
                checked={form.depositpaid}
                onChange={handleChange}
              />
            </Form.Group>
  
            {['checkin', 'checkout'].map((field) => (
              <Form.Group controlId={field} key={field} className="mb-3">
                <Form.Label>{field === 'checkin' ? 'Check-in Date' : 'Check-out Date'}</Form.Label>
                <Form.Control
                  type="date"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
  
            <div className="text-center">
              <Button type="submit" variant="primary" className="mt-3 px-4">
                Create Booking
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      </div>
     
    </div>
  );
};

export default CreateBooking;
