const { signupSchema } = require("../../../validation/validator")
const User = require("../../../models/usersModel")
const { doHash } = require("../../../utility/utils")

module.exports = async (req, res) => {
    const { email, password } = req.body
    try {
        const { error, value } = signupSchema.validate(req.body)
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(401).json({ success: false, message: 'User already exists' })
        }
        const hashedPassword = await doHash(password, 12)
        const newUser = new User({
            email, password: hashedPassword
        })
        
        const result = await newUser.save()
        result.password = undefined
        res.status(201).json({
            success: true, message: "Your account has been created", result
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
    
}