import React from 'react';
import './slotcard.css';
function SlotCard({ slot, onBook }) {
  return (
    <div className={`slot-card ${slot.isBooked ? 'booked' : 'available'}`}>
      <div className="slot-info">
        <span className="slot-date">{slot.date}</span>
        <h4 className="slot-time">{slot.time}</h4>
      </div>
      
      {slot.isBooked ? (
        <button className="book-btn disabled" disabled>Occupied</button>
      ) : (
        <button className="book-btn" onClick={() => onBook(slot.id)}>
          Book Now
        </button>
      )}
    </div>
  );
}

export default SlotCard;
