const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js"); // JWT token utility
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email.",
            });
        }

        // Hash password manually
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const userData = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user
        await userData.save();

        // Generate JWT token (use your generateToken utility here)
        // const token = generateToken(userData._id);

        // Respond with success and token
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




const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email "
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect  password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}
module.exports = {
    register,
    login,
    logout

}