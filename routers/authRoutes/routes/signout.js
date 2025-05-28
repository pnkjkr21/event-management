module.exports = async ( req, res ) => {
    return res.clearCookie('Authorization').status(200).json({ success: true, message: "Signed Out Successfully" })
}