import React, { useState } from "react";
import Navbar from "../components/navbar";
import SlotCard from "../components/slotcard.jsx";
import "./bookingappoinment.css";

function BookingAppointmentPage({ role, user, setRole, slots, nextDate, onBook }) {
  const [bookedDetails, setBookedDetails] = useState(null);

  const handleBooking = (slot) => {
    onBook(slot.id);
    setBookedDetails(slot);
  };

  const bookedSlots = slots.filter((slot) => slot.isBooked);
  const availableSlots = slots.filter((slot) => !slot.isBooked);

  // Confirmation view
  if (bookedDetails) {
    return (
      <div>
        <Navbar role={role} user={user} setRole={setRole} bookingCount={bookedSlots.length + 1} />
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
                <span className="status-badge confirmed">Confirmed</span>
              </div>
            </div>

            <button
              className="signin-btn"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={() => setBookedDetails(null)}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar role={role} user={user} setRole={setRole} bookingCount={bookedSlots.length} />
      <div className="booking-wrapper">
        <h2>Available Slots</h2>
        {availableSlots.length === 0 ? (
          <p className="no-slots-message">All slots are full!</p>
        ) : (
          <div className="slots-grid">
            {availableSlots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} onBook={() => handleBooking(slot)} />
            ))}
          </div>
        )}

        <h2>My Bookings</h2>
        {bookedSlots.length === 0 ? (
          <p className="no-slots-message">No booked appointments yet.</p>
        ) : (
          <div className="booked-slots-grid">
            {bookedSlots.map((slot) => (
              <div key={slot.id} className="booked-slot-card">
                <h4>{slot.time}</h4>
                <p>Appointment Date: {nextDate}</p>
                <span className="status-badge confirmed">Confirmed</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingAppointmentPage;

