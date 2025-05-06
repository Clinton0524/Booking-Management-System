// Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/AuthSlice"; // Adjust the path if needed

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column p-3 bg-light"
      style={{ width: "200px", height: "100vh" }}
    >
      <h4 className="mb-4">Dashboard</h4>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard" className="text-dark">
            Bookings
          </Nav.Link>
        </Nav.Item>

        {token ? (
          <Nav.Item>
            <Nav.Link onClick={handleLogout} className="text-danger" style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link as={Link} to="/" className="text-dark">
              Login
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
