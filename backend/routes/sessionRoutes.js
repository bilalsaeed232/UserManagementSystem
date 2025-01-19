const express = require("express")

const authenticate = require("../middleware/auth")
const Session = require("../models/Session")

const router = express.Router()


router.get("/devices", authenticate, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user.id }).select(
            "deviceName ipAddress createdAt"
        )

        res.status(200).json({ devices: sessions })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;