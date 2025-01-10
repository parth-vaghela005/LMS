const mongoose = require('mongoose');

// Define the User schema
const ParthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  city: {
    type: String,
    required: [true, 'City is required']
  }
}, { timestamps: true });

// Export the User model
module.exports = mongoose.model('Parth', ParthSchema);
