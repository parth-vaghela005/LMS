const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
  publicId: { type: String },
  isPreviewFree: { type: Boolean },
  test: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
},{timestamps:true});
 const Lecture = mongoose.model("Lecture", lectureSchema);
    module.exports = Lecture;