const express = require('express');
const router = express.Router();


const login = require('./routes/login')
const signup = require('./routes/signup')
const signout = require('./routes/signout')

router.post("/login", login);
router.post("/signup", signup);
router.delete("/signout", signout);

module.exports = router;