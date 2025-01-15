const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const Parth = require('../models/parth.model.js');
const { deleteMediaFromCloudinary,uploadMedia,deleteVideoFromCloudinary } = require("../utils/cloudinary.js");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    await userData.save();
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email ",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect  password",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};
 const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
    //   .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};
 const updateProfile = async (req,res) => {
  try {
      const userId = req.id;
      const {name} = req.body;
      const profilePhoto = req.file;
const updatedData    = {}
if(!name && !profilePhoto){
  return res.status(400).json({
      success:false,
      message:"Name or profile photo is required"
  })
}
  //  updatedData.name = name;
      const user = await User.findById(userId);
      if(!user){
          return res.status(404).json({
              message:"User not found",
              success:false
          }) 
      }
      if(name){
        updatedData.name = name
      }
if(profilePhoto){
  if(user.photoUrl){
    const publicId = user.photoUrl.split("/").pop().split(".")[0]; 
    deleteMediaFromCloudinary(publicId);
    const cloudResponse = await uploadMedia(profilePhoto.path);
      const photoUrl = cloudResponse.secure_url;
      updatedData.photoUrl = photoUrl
}
}
      

      

      // const updatedData = {name, photoUrl};
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

      return res.status(200).json({
          success:true,
          user:updatedUser,
          message:"Profile updated successfully."
      })

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"Failed to update profile"
      })
  }
}

const createUser = async (req, res) => {
  try {
    const { name, email, city } = req.body;

    // Validate required fields
    if (!name || !email || !city) {
      return res.status(400).json({ message: 'Name, email, and city are required' });
    }

    // Create a new user
    const user = new Parth({ name, email, city });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// module.exports = { createUser };

module.exports = {
  register,
  login,
  logout,
  getUserProfile,
  updateProfile,
  createUser
};
