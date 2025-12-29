import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ role, user, setRole, bookingCount }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole(""); 
    navigate("/login"); // Redirect after logout
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate(role === "admin" ? "/admin" : "/booking")} style={{cursor: 'pointer'}}>
          <span className="logo-text">SmartBook</span>
        </div>

        <ul className="nav-links">
          {role === "admin" ? (
            <>
              <li><Link to="/admin">Manage Slots</Link></li>
              <li><Link to="/admin">Analytics</Link></li>
            </>
          ) : (
            <li>
              <Link to="/booking">
                My Bookings {bookingCount > 0 && <span className="count-badge">{bookingCount}</span>}
              </Link>
            </li>
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

