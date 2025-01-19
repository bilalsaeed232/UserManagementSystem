const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    deviceName: { type: String, required: true}, // e.g., "Chrome on windows"
    ipAddress: { type: String }, // IP Address of the device
    token: { type: String }, // JWT Token
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Session", sessionSchema)