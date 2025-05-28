const User = require("../../../models/usersModel");
const loginSchema = require("../../../validation/validator")


const { doHashValidation, generateToken, extractUserInfo } = require("../../../utility/utils");

module.exports = async (req, res) => {
  try {
    const authToken = req.headers.authorization
    const { userId, email: userEmail } = extractUserInfo(authToken)
    if (userId || userEmail) {
        return res.status(400).json({
            message: 'User already logged in'
        })
    }
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      console.log({ error });
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const { email, password } = value;
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const result = await doHashValidation(password, existingUser.password);
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = generateToken(existingUser)
    return res
      .cookie("Authorization", 'Bearer ' + token, {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        token,
        message: "Logged in successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
