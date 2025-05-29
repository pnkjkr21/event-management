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
      session.endSession();
      return res
        .status(401)
        .json({ message: "Please login to register for the event" });
    }

    const eventId = req.params.id;

    const event = await Event.findById(eventId).session(session);
    if (!event) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if already registered
    const alreadyRegistered = await Registration.findOne({
      eventId,
      userId,
      isActive: true,
    }).session(session);
    if (alreadyRegistered) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }

    // Atomically increment registeredCount if below capacity
    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        registeredCount: { $lt: event.capacity },
      },
      {
        $inc: { registeredCount: 1 },
      },
      {
        new: true,
        session,
      }
    );

    if (!updatedEvent) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Event is full. Registration not allowed." });
    }

    const registration = new Registration({
      eventId,
      userId,
      createdOn: new Date(),
      isActive: true,
    });

    await registration.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Successfully registered for the event",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Handle concurrency write conflict
    if (error.code === 112 || error.codeName === "WriteConflict") {
      console.warn(
        "Write conflict occurred during registration:",
        error.message
      );
      return res.status(409).json({
        success: false,
        message:
          "The event is experiencing high traffic. Please try again shortly.",
      });
    }

    console.error("Unexpected error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
