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
    const { deviceId } = req.body; // Session ID of the device to log out

    try {
        if (!deviceId) {
            return res.status(400).json({ message: "Device ID is required" });
        }

        const session = await Session.findOne({ 
            _id: deviceId,
            userId: req.user.id
        });

        if (!session) {
            return res.status(404).json({ message: "Device session not found" });
        }

        // Don't allow logging out from current device, we use userRoutes to logout self
        if (session.token === req.token) {
            return res.status(400).json({ message: "Cannot logout from current device" });
        }

        await session.deleteOne();
        res.status(200).json({ message: "Logged out from the device successfully" });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid device ID format" });
        }
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;