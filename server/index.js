const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const cors = require('cors')
const mediaRoute  = require('../server/routes/media.route.js')
const authrouter  = require('../server/routes/Authroute.js')
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  app.use('/api/v1/auth',authrouter)
  app.use("/api/v1/media",mediaRoute )
  mongoose.set('strictPopulate', false);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
