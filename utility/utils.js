const jwt = require('jsonwebtoken')
const { hash, compare } = require('bcryptjs')

exports.doHash = (value, saltValue) => {
    const result = hash(value, saltValue)
    return result
}

exports.doHashValidation = (value, hashedValue) => {
    const result = compare(value, hashedValue)
    return result
}

exports.generateToken = (user) => {
    if (!user || !user.id || !user.email) {
      throw new Error("Invalid user object");
    }
  
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "8h",
      }
    );
  };


exports.extractUserInfo = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      return {
          userId: decoded.userId,
          email: decoded.email
      };
    } catch (error) {
      return {
        success: false,
        userId: '',
        email: ''
      };
    }
  };