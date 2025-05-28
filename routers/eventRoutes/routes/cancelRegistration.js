const Event = require("../../../models/eventsModel");
const Registration = require("../../../models/registrationsModel");
const { extractUserInfo } = require("../../../utility/utils");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { userId, email } = extractUserInfo(token);

    if (!userId || !email) {
      return res.status(401).json({ message: "Please login to cancel registration" });
    }

    const eventId = req.params.id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find the registration and check if it's active
    const registration = await Registration.findOne({ eventId, userId, isActive: true });

    if (!registration) {
      return res.status(400).json({ message: "No active registration found for this event" });
    }

    // Mark registration as inactive
    registration.isActive = false;
    registration.updatedOn = new Date();
    await registration.save();

    return res.status(200).json({
      success: true,
      message: "Registration cancelled successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
