import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./pages/login";
import Signup from "./pages/signup";   // ✅ ADD THIS
import UserDashboard from "./pages/userdashboard";
import AdminDashboard from "./pages/admindashboard";
import BookingAppointment from "./pages/bookingappoinment";

function App() {
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [slots, setSlots] = useState([
    { id: 1, time: "09:00 AM", isBooked: false },
    { id: 2, time: "10:30 AM", isBooked: true },
    { id: 3, time: "01:00 PM", isBooked: false },
    { id: 4, time: "02:30 PM", isBooked: false },
  ]);

  const nextDate = new Date().toISOString().split("T")[0];

  const handleBook = (id) => {
    setSlots(prev =>
      prev.map(slot =>
        slot.id === id ? { ...slot, isBooked: true } : slot
      )
    );
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID.apps.googleusercontent.com">
      <Router>
        <Routes>

          <Route path="/login"
            element={
              role ? <Navigate to={role === "admin" ? "/admin" : "/user"} />
                   : <Login setRole={setRole} setUserInfo={setUserInfo} />
            }
          />

          {/* ✅ SIGNUP ROUTE FIX */}
          <Route
            path="/signup"
            element={
              <Signup setUserInfo={setUserInfo} setRole={setRole} />
            }
          />

          <Route path="/user"
            element={role === "user"
              ? <UserDashboard user={userInfo} setRole={setRole}
                  slots={slots} nextDate={nextDate} onBook={handleBook} />
              : <Navigate to="/login" />
            }
          />

          <Route path="/booking"
            element={role === "user"
              ? <BookingAppointment slots={slots} nextDate={nextDate} onBook={handleBook} />
              : <Navigate to="/login" />
            }
          />

          <Route path="/admin"
            element={role === "admin"
              ? <AdminDashboard setRole={setRole} />
              : <Navigate to="/login" />
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
