import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

// ✅ Render port
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://subtle-pasca-09fa80.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

const USERS_FILE = path.join(__dirname, "users.json");

// Helpers
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// ✅ LOGIN / REGISTER (single API)
app.post("/api/login", (req, res) => {
  const { email, name, picture } = req.body;

  if (!email || !name) {
    return res.status(400).json({
      success: false,
      message: "Email and name are required",
    });
  }

  let users = readUsers();
  let user = users.find((u) => u.email === email);

  if (!user) {
    user = {
      id: Date.now(),
      name,
      email,
      picture,
      role: email === "admin@gmail.com" ? "admin" : "user",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    writeUsers(users);
  }

  res.json({
    success: true,
    message: "Login successful",
    user,
  });
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
