import React, { useState } from "react";
import SlotCard from "../components/slotcard.jsx";
import "./userdashboard.css"; // Reusing styles for consistency

function BookAppointment({ slots, nextDate, onBook }) {
  const [bookedDetails, setBookedDetails] = useState(null);

  const handleBooking = (slot) => {
    // Call the parent booking function
    onBook(slot.id);
    // Set local state to show confirmation UI
    setBookedDetails(slot);
  };

  if (bookedDetails) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="success-icon">✔</div>
          <h2>Booking Confirmed!</h2>
          <p className="subtitle">Thank you for choosing SmartBook.</p>
          
          <div className="receipt-details">
            <div className="receipt-row">
              <span>Appointment Date:</span>
              <strong>{nextDate}</strong>
            </div>
            <div className="receipt-row">
              <span>Time Slot:</span>
              <strong>{bookedDetails.time}</strong>
            </div>
            <div className="receipt-row">
              <span>Status:</span>
              <span className="status-badge">Confirmed</span>
            </div>
          </div>

          <button 
            className="signin-btn" 
            style={{width: '100%', marginTop: '20px'}}
            onClick={() => setBookedDetails(null)}
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="slots-grid">
      {slots.map((slot) => (
        <SlotCard key={slot.id} slot={slot} onBook={() => handleBooking(slot)} />
      ))}
    </div>
  );
}

export default BookAppointment;