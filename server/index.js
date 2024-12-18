const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('../server/models/user.model.js'); // Import the User model
const { validationResult } = require('express-validator');
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.get('/get', async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await User.find({
        name:"parth"
      });

      // Send response with fetched users
      res.status(200).json({
          message: 'Users fetched successfully',
          users: users,
      });
  } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({
          message: 'Server error',
          error: error.message,
      });
  }
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
app.listen(PORT, () => {
    // connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});
