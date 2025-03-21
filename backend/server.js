require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  registrationId: { type: String, required: true, unique: true }, // Changed to match the database
  mohDivision: String,
  governmentRegNumber: String,
  workPlace: String,
  isActive: Boolean,
  createdAt: Date,
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

// Route to search user by registrationId
app.get('/search/:registrationId', async (req, res) => {
  const { registrationId } = req.params;
  console.log(`🔍 Searching for Registration ID: ${registrationId}`);

  try {
    const user = await User.findOne({ registrationId });

    if (user) {
      console.log("✅ User Found:", user);
      return res.json(user); // Return user details if found
    } else {
      console.log("❌ User not found");
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("🔥 Error in query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
