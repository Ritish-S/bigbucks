import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./signup.css";

const API_URL = "https://bigbucks-i87n.onrender.com";

function Signup({ setUserInfo, setRole }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleSignup = async () => {
    if (!email || !password) {
      showMessage("Email and password required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: email.split("@")[0], // required by backend
        }),
      });

      const data = await res.json();

      if (!data.success) {
        showMessage(data.message);
        return;
      }

      setUserInfo(data.user);
      setRole(data.user.role);

      showMessage("Signup completed successfully!");

      setTimeout(() => navigate("/user"), 1000);
    } catch (err) {
      showMessage("Server not running");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Account</h2>

        {message && <div className="custom-alert">{message}</div>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signup-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
