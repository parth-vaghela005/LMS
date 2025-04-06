const Lecture = require("../models/lecture.model");
const { Result } = require("../models/result.model");
const { Test } = require("../models/test.model");

const CreateTest = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const { lectureId } = req.params;

    if (!question || !options || !correctAnswer || !lectureId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const newTest = new Test({
      question,
      options,
      correctAnswer,
      lectureId,
    });
    await newTest.save();
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }
    lecture.test.push(newTest._id);
    await lecture.save();
    return res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: newTest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const GetTestbyId = async (req, res) => {
  try {
    const { Id } = req.params;
    const test = await Test.findById(Id);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Test found successfully",
      data: test,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  CreateTest,
  GetTestbyId,

};
