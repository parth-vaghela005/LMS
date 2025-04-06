const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lecture' , required:true},
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' ,required:true},
  total_questions: { type: Number },
  correct_questions: { 
    type: Array, 
    default: [] 
  },
  wrong_questions: { 
    type: Array, 
    default: [] 
  },
  createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = {
    Result
}
