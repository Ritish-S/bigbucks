import { useState } from "react";
import "./login.css";
import loginImage from "../assets/beautiful-still-life-with-water_23-2149199544 (1).avif";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login({ setRole, setUserInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const FIXED_PASSWORD = "123456";

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 5500);
  };

  // This function MUST be triggered by the form's onSubmit
  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevents the page from refreshing

    if (password !== FIXED_PASSWORD) {
      showMessage("Incorrect password");
      return;
    }

    // Creating the user object so it shows in the Navbar
    const generatedName = email.split('@')[0];
    const formattedName = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);

    setUserInfo({
      name: formattedName,
      email: email,
      picture: `https://ui-avatars.com/api/?name=${formattedName}&background=2563eb&color=fff`
    });

    if (email === "admin@gmail.com") {
      setRole("admin");
    } else {
      setRole("user");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2 className="brand">Login</h2>
        <p className="subtitle">Please enter your details</p>

        {message && <div className="custom-alert">{message}</div>}

        {/* --- STEP 1: USE A FORM TAG WITH ONSUBMIT --- */}
        <form onSubmit={handleLoginSubmit}>
          
          <label htmlFor="user_email">Email address</label>
          <input
            id="user_email"
            type="email"
            name="username"           // STEP 2: Google looks for "username" or "email" name
            autoComplete="username"  // STEP 3: Tells Google this is the login ID
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="user_password">Password</label>
          <input
            id="user_password"
            type="password"
            name="password"           // STEP 4: Google looks for "password" name
            autoComplete="current-password" // STEP 5: Tells Google this is the password
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <span className="link">Forgot password</span>
          </div>

          {/* --- STEP 6: BUTTON MUST BE TYPE="SUBMIT" --- */}
          <button type="submit" className="signin-btn">
            Sign in
          </button>
        </form>

        <div className="google-btn-container" style={{ marginTop: '15px' }}>
          <GoogleLogin 
            onSuccess={(res) => {
                const decoded = jwtDecode(res.credential);
                setUserInfo(decoded);
                setRole(decoded.email === "admin@gmail.com" ? "admin" : "user");
            }} 
            onError={() => showMessage("Google Login Failed")}
            width="100%"
          />
        </div>

        <p className="signup-text">
          Don’t have an account? <span className="link">Sign up</span>
        </p>
      </div>

      <div className="login-right">
        <img src={loginImage} alt="Illustration" className="login-image" />
      </div>
    </div>
  );
}

export default Login;