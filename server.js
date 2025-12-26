import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, "users.json");

// Helper: Read users
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
};

// Helper: Write users
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// ✅ LOGIN / REGISTER API
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

  return res.json({
    success: true,
    message: "Login successful",
    user,
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
