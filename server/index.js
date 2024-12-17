const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const User = require('../server/models/user.model.js'); // Import the User model
const { validationResult } = require('express-validator');
// const connectDB  = require('./utils/db.js')
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.post('/',async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
app.delete('/delete',async(req,res)=>{
  const user = await  User.findByIdAndDelete({
    _id:"67619fe2eafbaf864313da93"
  })
  res.json({
    message: 'user deleted',
  })
})
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
});
    // Step 2: Destructure `name` and `email` from request body
    const { name, email } = req.body;

    try {
        // Step 3: Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Step 4: Create a new user
        user = new User({
            name,
            email,
        });

        // Step 5: Save user to the database
        await user.save();

        // Step 6: Send success response
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error in registration:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
//  module.exports = connectDB
app.listen(PORT, () => {
    // connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});
