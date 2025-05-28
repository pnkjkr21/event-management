const mongoose = require("mongoose");
const Event = require("../../../models/eventsModel");
const Registration = require("../../../models/registrationsModel");
const { extractUserInfo } = require("../../../utility/utils");

module.exports = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const token = req.headers.authorization;
    const { userId, email } = extractUserInfo(token);

    if (!userId || !email) {
      await session.abortTransaction();
      return res.status(401).json({ message: "Please login to register for the event" });
    }

    const eventId = req.params.id;

    const event = await Event.findById(eventId).session(session);
    if (!event) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRegistered = await Registration.findOne({ eventId, userId, isActive: true }).session(session);
    if (alreadyRegistered) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User already registered for this event" });
    }

    const currentCount = await Registration.countDocuments({ eventId, isActive: true }).session(session);
    if (currentCount >= event.capacity) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Event is full. Registration not allowed." });
    }

    const registration = new Registration({
      eventId,
      userId,
      createdOn: new Date()
    });

    await registration.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Successfully registered for the event"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
