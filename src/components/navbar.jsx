import React, { useState } from 'react';
import './navbar.css';

const Navbar = ({ role, user, setRole, onViewChange, bookingCount }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    setRole(""); 
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => onViewChange("available")} style={{cursor: 'pointer'}}>
          <span className="logo-text">SmartBook</span>
        </div>

        <ul className="nav-links">
          <li><a href="#home" onClick={() => onViewChange("available")}>Home</a></li>
          {role === "admin" ? (
            <>
              <li><a href="#manage">Manage Slots</a></li>
              <li><a href="#analytics">Analytics</a></li>
            </>
          ) : (
            <>
              <li>
                <a href="#my-bookings" onClick={(e) => {
                  e.preventDefault();
                  onViewChange("history");
                }}>
                  My Bookings {bookingCount > 0 && <span className="count-badge">{bookingCount}</span>}
                </a>
              </li>
            </>
          )}
        </ul>

        <div className="nav-user-section">
          <div className="user-profile-info" onClick={() => setShowProfile(!showProfile)}>
            <img src={user?.picture} alt="profile" className="nav-avatar" />
            <span className="nav-username">{user?.name} ▾</span>
          </div>
          
          <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>

          {showProfile && (
            <div className="profile-details-card">
              <div className="details-header">
                <img src={user?.picture} alt="profile" className="large-avatar" />
                <h3>{user?.name}</h3>
                <p className="user-role">{role?.toUpperCase()}</p>
              </div>
              <div className="details-body">
                <p><strong>Email:</strong> {user?.email}</p>
              </div>
              <button className="close-details" onClick={() => setShowProfile(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;