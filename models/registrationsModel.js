const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "EventId is required!"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required!"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
