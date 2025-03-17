const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// User Schema (assuming registration_number is stored in _id)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

// Route to search by registration_number stored as _id
app.get('/search/:registrationNumber', async (req, res) => {
  const registrationNumber = req.params.registrationNumber; // registration_number is stored in _id field
  try {
    // Find user by _id (which is the registration number)
    const user = await User.findById(registrationNumber);
    if (user) {
      res.json(user);  // Send back user data if found
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
