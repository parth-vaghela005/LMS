const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  pid: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  method: {
    type: String,
  },
  cardNumber: {
    type: String,
   
  },
  cvv: {
    type: String,
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
