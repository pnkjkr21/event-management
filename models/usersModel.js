const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    trim: true,
    unique: [true, "Email must be unique!"],
    minLength: [5, "Email must have at least 5 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password must be provided!"],
    trim: true,
    select: false,
  },
  active: {
    type: Boolean,
    default: true
  },
});

module.exports = mongoose.model("User", userSchema);
