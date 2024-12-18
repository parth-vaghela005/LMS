const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('../server/models/user.model.js');
const authrouter  = require('../server/routes/Authroute.js')
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  app.use('/api/v1/auth',authrouter)
app.listen(PORT, () => {
    // connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});
