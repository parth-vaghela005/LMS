const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
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
  certificateUrl: {
    type: String,
    required: true
  },
},{
    timestamps: true
});

module.exports = mongoose.model("Certificate", CertificateSchema);
