const  jwt =  require("jsonwebtoken");
 generateToken = (res, user, message) => {
  // console.log(user.role + "from token");
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    }).json({
        success:true,
        message,
        user,
        role:user.role
    });
    console.log("user"  + user);
    
};


module.exports = generateToken