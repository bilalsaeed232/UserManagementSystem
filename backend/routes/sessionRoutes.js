const express = require("express")

const authenticate = require("../middleware/auth")
const Session = require("../models/Session")

const router = express.Router()


router.get("/devices", authenticate, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user.id}).select(
            "deviceName ipAddress createdAt"
        )

        res.status(200).json({ devices: sessions })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete("/devices/logout", authenticate, async (req, res) => {
    const { token } = req.body; // Token of the device to log out

    try {

        const session = await Session.findOneAndDelete({ userId: req.user.id, token, deviceName: userAgent })
        if (!session) {
            return res.status(404).json({message: "Session not found"})
        }

        res.status(200).json({ message: "Logged out from the device successfully" })
    } catch (error) {
        res.status(500).json({error: error.message })
    }
})

module.exports = router;