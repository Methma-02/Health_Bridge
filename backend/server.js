require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;

// Middleware 
app.use(express.json());
app.use(cors());

// 🔹 Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String, // "mother" or "doctor"
});

const User = mongoose.model("User", userSchema);

// Symptom Schema
const symptomSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  encryptedSymptoms: String,
});

const Symptom = mongoose.model("Symptom", symptomSchema);

// 🔹 REGISTER USER
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ msg: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  const token = jwt.sign({ userId: newUser._id, role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ msg: "User registered successfully", token });
});

// 🔹 LOGIN USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token });
});

// 🔹 ADD SYMPTOM (Encrypted)
app.post("/symptoms", authMiddleware, async (req, res) => {
  const { date, symptoms } = req.body;
  if (!date || !symptoms) return res.status(400).json({ msg: "Date and Symptoms are required" });

  const encryptedSymptoms = CryptoJS.AES.encrypt(JSON.stringify(symptoms), ENCRYPTION_SECRET).toString();

  const newSymptom = new Symptom({ userId: req.user.userId, date, encryptedSymptoms });
  await newSymptom.save();

  res.json({ msg: "✅ Symptoms saved successfully" });
});

// 🔹 GET ALL SYMPTOMS (Decrypted)
app.get("/symptoms", authMiddleware, async (req, res) => {
  const symptoms = await Symptom.find({ userId: req.user.userId });

  const decryptedSymptoms = symptoms.map((entry) => ({
    _id: entry._id,
    date: entry.date,
    symptoms: JSON.parse(CryptoJS.AES.decrypt(entry.encryptedSymptoms, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8)),
  }));

  res.json(decryptedSymptoms);
});

// 🔹 DELETE A SYMPTOM BY ID
app.delete("/symptoms/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const symptom = await Symptom.findOne({ _id: id, userId: req.user.userId });

  if (!symptom) return res.status(404).json({ msg: "Symptom not found" });

  await Symptom.findByIdAndDelete(id);
  res.json({ msg: "✅ Symptom deleted successfully" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
