const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required!"], trim: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  location: { type: String, required: [true, "Location is required!"], trim: true },
  capacity: { type: Number, required: [true, "Capacity is required!"] },
});

module.exports = mongoose.model("Event", eventSchema);
