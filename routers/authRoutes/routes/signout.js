module.exports = async ( req, res ) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(400).json({
            message: "Already logged out"
        })
    }
    return res.clearCookie('Authorization').status(200).json({ success: true, message: "Signed Out Successfully" })
}