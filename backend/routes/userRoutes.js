const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const authenticate = require("../middleware/auth")

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

// Login User
router.post("/login", async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        // user not found
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        // wrong password
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        // generate jwt and send in payload
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h"})
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({error: error.message})    
    }
})


// Get User details
router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // exlude password from resultset
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Update user profile
router.put("/me", authenticate, async (req, res) => {
    const { name, email } = req.body

    try {
        const updatedData = {}
        if(name) updatedData.name = name
        if(email) updatedData.email = email

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updatedData },
            { new: true, runValidators: true }
        ).select("-password") // Exclude password from the response

        if(!updatedUser) return res.status(404).json({message: "User not found"})

        res.status(200).json({message: "Profile updated successfully", user: updatedUser})
    } catch (error) {
        // Handle duplicate email errors
        if (error.code === 11000) {
            return res.status(400).json({message: "Email already exists"})
        }
        res.status(500).json({error: error.message})
    }
})



module.exports = router;