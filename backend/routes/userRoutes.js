const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const router = express.Router()

// Register User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: "User created successfully!"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;