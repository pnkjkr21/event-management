const { eventSchema } = require("../../../validation/validator");
const Event = require("../../../models/eventsModel");
const { extractUserInfo } = require("../../../utility/utils");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { userId, email } = extractUserInfo(token);

    if (!userId || !email) {
      return res.status(401).json({
        message: "Please login to create event",
      });
    }

    const eventPayload = {
      ...req.body
    };

    const { error, value } = eventSchema.validate(eventPayload);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const newEvent = new Event(value); // use validated value
    const result = await newEvent.save();

    return res.status(201).json({
      message: "Event added Successfully",
      result,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
