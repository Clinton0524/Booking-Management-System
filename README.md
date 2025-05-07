Booking Management System
Overview
This is a Booking Management System that allows users to manage bookings effectively. The project consists of a frontend built with React and Redux for state management, and it interacts with an API for managing booking data (such as fetching and adding bookings).

Features
Dashboard: View a list of bookings with the option to search by Booking ID.

Pagination: Paginate through the list of bookings.

Add Booking: Add new bookings.

View Booking Details: View detailed information of a booking.

Search: Filter bookings based on Booking ID.

Authentication: Login functionality with JWT authentication for secure user access.

Token Storage: The system stores JWT tokens in localStorage for session management.

API Integration: The app communicates with a remote backend API for performing CRUD operations on bookings.

Frontend:

React.js

Redux Toolkit (for state management)

React Router (for routing)

React Bootstrap (for UI components)

Fetch API (for API calls)

Others:

JWT (JSON Web Token) for authentication and token management

Getting Started
Clone this repository to your local machine.

Installation
Clone the repository:
git clone https://github.com/Clinton0524/Booking-Management-System.git

Install the dependencies:
npm install

Run the application locally:
npm start
This will start the development server at http://localhost:3000.

Features and Usage
Dashboard: The dashboard displays a list of all bookings and allows you to:

View: Click on a booking ID to view detailed information.

Search: Filter bookings by Booking ID.

Add Booking
To add a new booking, click on the Add Booking button, fill in the necessary information, and submit the form.

Login
Login: Users can log in using their credentials (username and password). The system uses JWT for authentication, and the token is stored in localStorage.

API Endpoints
GET /booking: Fetch all booking id.

GET /booking/{id}: Get booking details as per id.

POST /booking: Create a new booking.

Project Structure
/src
  /Components
    /BookingDetails.js  // Component to show booking details
    /CreateBooking.js   // Component for creating a new booking
    /Dashboard.js       // Dashboard component that shows all bookings
    /LoginPage.js       // Page for login
    /Sidebar            // Component for sidebar
  /Redux
    /BookingSlice.js    // Redux slice for booking operations(add,get booking ids,get booking details by id)
    /AuthSlice.js       // Redux slice for user authentication
    /Store.js           // Redux store setup
  /App.js               // Main application component where routing is setup
  /index.js             // Entry point of the React app
  /App.css              // Styles for the app
  /index.css            // Global styles

Notes:
`Used simple bootstrap to make the pages responsive
`There was a problem with the api i was not able to fetch the api in my local server so I use 
 https://cors-anywhere.herokuapp.com/ in front of the API URL because the browser blocks requests
 to other websites if they don’t allow it (that’s called a CORS issue). This tool acts like a middleman
 it fetches the data for me and adds the right headers so the browser doesn’t block it.
`Couldnt show the first name and last name on the list because the get booking api does not provide the information.
`When i add the bookings it is getting updated in list (i have stored it in localstorage) but as the list is not stable
 it appears randomly in the list not first so i hvae added a console log after submitting the form so that we get the booking id.
 If you take the booking id and search you will get the data.
`I have not addeed the edit and delete because the backend is not allowing me to edit or delete the data





