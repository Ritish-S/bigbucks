import { useState } from "react";

function AdminDashboard() {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addSlot = () => {
    const newSlot = {
      id: slots.length + 1,
      date,
      time,
      isBooked: false
    };
    setSlots([...slots, newSlot]);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Time" onChange={(e) => setTime(e.target.value)} />
      <button onClick={addSlot}>Add Slot</button>

      <ul>
        {slots.map((slot) => (
          <li key={slot.id}>
            {slot.date} - {slot.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
