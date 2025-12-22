import { useState } from "react";
import Login from "./pages/login";
import UserDashboard from "./pages/userdashboard";
import AdminDashboard from "./pages/admindashboard"; 
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useState(null); 
let screen;
  if (!role) {
    screen = <Login setRole={setRole} setUserInfo={setUserInfo} />;
  }
   else if (role === "user") { 
    screen = <UserDashboard user={userInfo} />;
  } 
  else if (role === "admin") {
    screen = <AdminDashboard />;
  }
  return (
    <GoogleOAuthProvider clientId="610018784372-7u1a4j6d4qovau1mo0o228idin0o3bkb.apps.googleusercontent.com">
      {screen}
    </GoogleOAuthProvider>
  );
}

export default App;