const Event = require("../../../models/eventsModel");

module.exports = async (req, res) => {
  try {
    const result = await Event.find({});
    return res.status(200).json({
        message: 'Events Fetched Successfully!',
        events: result
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
