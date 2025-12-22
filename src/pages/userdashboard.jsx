import { useState } from "react";
import SlotCard from "../components/slotcard.jsx";
import Navbar from "../components/navbar.jsx";
import "./userdashboard.css";

function UserDashboard({ user, setRole }) {
  const [slots, setSlots] = useState([
    { id: 1, time: "09:00 AM", isBooked: false },
    { id: 2, time: "10:30 AM", isBooked: true },
    { id: 3, time: "01:00 PM", isBooked: false },
    { id: 4, time: "02:30 PM", isBooked: false },
  ]);

  const today = new Date().toISOString().split("T")[0];
  const [nextDate, setNextDate] = useState(today);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);
  
  // NEW STATES
  const [myBookings, setMyBookings] = useState([]); // Stores all confirmed bookings
  const [view, setView] = useState("available"); // Toggles "available" or "history"

  const bookSlot = (slot) => {
    const updatedSlots = slots.map((s) =>
      s.id === slot.id ? { ...s, isBooked: true } : s
    );
    setSlots(updatedSlots);
    
    // Add to History
    setMyBookings([...myBookings, { ...slot, date: nextDate }]);
    setBookedDetails(slot); 
  };

  const availableSlotsCount = slots.filter(s => !s.isBooked).length;
  const isPastDate = nextDate < today;

  return (
    <div className="dashboard-wrapper">
      <Navbar 
        role="user" 
        user={user} 
        setRole={setRole} 
        onViewChange={setView} 
        bookingCount={myBookings.length}
      />

      <div className="dashboard-body">
        <section className="stats-container">
          <div className="stat-box" onClick={() => setView("available")} style={{cursor: 'pointer'}}>
            <p className="subtitle">Available Slots</p>
            <h3>{isPastDate ? 0 : availableSlotsCount}</h3>
          </div>
          <div className="stat-box" onClick={() => setView("history")} style={{cursor: 'pointer'}}>
            <p className="subtitle">My Bookings</p>
            <h3 style={{ color: "#2563eb" }}>{myBookings.length}</h3>
          </div>

          <div className="stat-box promo-box">
            <p>Select Date:</p>
            {isEditingDate ? (
              <div className="edit-date-container">
                <input type="date" value={nextDate} onChange={(e) => setNextDate(e.target.value)} className="date-input" />
                <button className="save-date-btn" onClick={() => setIsEditingDate(false)}>Save</button>
              </div>
            ) : (
              <div className="view-date-container" onClick={() => setIsEditingDate(true)}>
                <strong style={{ cursor: "pointer", textDecoration: "underline" }}>{nextDate} ✎</strong>
              </div>
            )}
          </div>
        </section>

        <section className="booking-main">
          {/* VIEW 1: CONFIRMATION SCREEN */}
          {bookedDetails ? (
            <div className="confirmation-container">
              <div className="confirmation-card">
                <div className="success-icon">✔</div>
                <h2>Booking Confirmed!</h2>
                <div className="receipt-details">
                  <div className="receipt-row"><span>Date:</span> <strong>{nextDate}</strong></div>
                  <div className="receipt-row"><span>Time:</span> <strong>{bookedDetails.time}</strong></div>
                </div>
                <button className="signin-btn" onClick={() => setBookedDetails(null)}>Book Another</button>
              </div>
            </div>
          ) : view === "history" ? (
            /* VIEW 2: MY BOOKINGS HISTORY */
            <div className="history-view">
              <div className="booking-header">
                <button className="back-link" onClick={() => setView("available")}>← Back to Booking</button>
                <h1>My Bookings</h1>
              </div>
              {myBookings.length === 0 ? (
                <div className="no-slots-message"><h3>No bookings found.</h3></div>
              ) : (
                <div className="history-list">
                  {myBookings.map((b, i) => (
                    <div key={i} className="history-item">
                      <div>
                        <strong>{b.time}</strong>
                        <p>{b.date}</p>
                      </div>
                      <span className="status-confirmed">Confirmed</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* VIEW 3: AVAILABLE SLOTS GRID */
            <>
              <div className="booking-header">
                <h1>Book Your Appointment</h1>
                <p className="subtitle">Slots for: <strong>{nextDate}</strong></p>
              </div>
              <div className="slots-grid">
                {isPastDate ? (
                  <div className="no-slots-message"><h3>🚫 No slots found for past dates</h3></div>
                ) : availableSlotsCount === 0 ? (
                  <div className="full-slots-message"><h3>⚠️ All Slots are Full!</h3></div>
                ) : (
                  slots.map((slot) => <SlotCard key={slot.id} slot={slot} onBook={() => bookSlot(slot)} />)
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;