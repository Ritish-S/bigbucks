import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImage from "../assets/beautiful-still-life-with-water_23-2149199544 (1).avif";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://bigbucks-i87n.onrender.com";

function Login({ setRole, setUserInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const loginWithAPI = async (user) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!data.success) {
        showMessage(data.message || "Login failed");
        return;
      }

      setUserInfo(data.user);
      setRole(data.user.role);
      navigate(data.user.role === "admin" ? "/admin" : "/user");
    } catch {
      showMessage("Backend server not running");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage("Email and password required");
      return;
    }

    const name = email.split("@")[0];
    loginWithAPI({ email, name });
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2 className="brand">Login</h2>

        {message && <div className="custom-alert">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/signup", { state: { email } })}
          >
            Create account
          </span>
        </p>

        <div style={{ marginTop: "15px" }}>
          <GoogleLogin
            onSuccess={(res) => {
              const decoded = jwtDecode(res.credential);
              loginWithAPI({
                email: decoded.email,
                name: decoded.name,
                picture: decoded.picture,
              });
            }}
            onError={() => showMessage("Google login failed")}
          />
        </div>
      </div>

      <div className="login-right">
        <img src={loginImage} alt="login" className="login-image" />
      </div>
    </div>
  );
}

export default Login;


