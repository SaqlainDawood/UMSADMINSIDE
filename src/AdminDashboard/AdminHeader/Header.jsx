import React, { useState } from "react";
import {
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Header.css";
// NOTE: I've commented out the import and use of useNavigate
// because navigation is usually a part of the frontend routing system,
// but it is tied to the backend logout logic.
// If you want to keep navigation for pure frontend purposes, uncomment the lines below.
// import { useNavigate } from 'react-router-dom';

const Header = () => {
  // const navigate = useNavigate(); // Commented out
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // --- BACKEND/SESSION LOGIC REMOVED ---
    console.log("Logout action initiated (Storage clearing removed).");
    // All localStorage.removeItem, sessionStorage.clear, and navigate calls are removed.

    // Toggle the menu closed after the (simulated) action
    setMenuOpen(false); 
    
    // If you want to log out but still navigate somewhere, 
    // uncomment the navigate line below (requires uncommenting the import above).
    // navigate('/admin/login'); 
  };

  return (
    <header className="admin-header shadow-sm">
      {/* Left - Page Title */}
      <div className="header-left">
        <h4>University Management</h4>
      </div>

      {/* Right - User & Actions */}
      <div className="header-right">
        <button className="icon-btn">
          <FaBell />
          <span className="badge">3</span>
        </button>
        <div className="admin-user">
          <FaUserCircle className="user-avatar" />
          <span className="admin-name">Admin</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>

        {/* Hamburger for mobile */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item">
            <FaBell /> Notifications
          </button>
          <button className="dropdown-item">
            <FaUserCircle /> Profile
          </button>

          <button className="dropdown-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;