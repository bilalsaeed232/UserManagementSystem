const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({message: "Access Denied"})
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifiedUser 
        req.token = token
        next()
    } catch (error) {
        res.status(400).json({message: "Invalid Token"})
    }
}


module.exports = authenticate