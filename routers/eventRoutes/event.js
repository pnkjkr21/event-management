const express = require('express');
const router = express.Router();

const getEvents = require("./routes/getEvents")
const postEvent = require("./routes/postEvents")
const register = require("./routes/register")
const cancelRegistration = require("./routes/cancelRegistration")

router.get("/", getEvents);
router.post("/", postEvent);
router.post("/:id/register", register);
router.delete("/:id/register", cancelRegistration);

module.exports = router;