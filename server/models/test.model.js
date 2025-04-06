const mongoose = require("mongoose");
const TestSchema = new mongoose.Schema({
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  selected:{
    type:String,
    default:""
  },
  options: {
    type: Object, // Storing options as an object instead of an array
    required: true,
    validate: {
      validator: function (obj) {
        return Object.keys(obj).length === 4; // Ensure exactly 4 options
      },
      message: "Options object must contain exactly 4 values."
    }
  },
  correctAnswer: {
    type: String,
    required: true
  }
});
const Test = mongoose.model("Test", TestSchema);
module.exports = { Test };
