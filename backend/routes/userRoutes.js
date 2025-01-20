const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Session = require("../models/Session")
const authenticate = require("../middleware/auth")
const upload = require("../middleware/upload")

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
    const {email, password, deviceName} = req.body

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

        // Save session in the database
        const ipAddress = req.ip || "Unknown IP"
        const userAgent = req.headers["user-agent"] || "Unknown";

        // Check if a session already exists for this user with the same device and IP
        const existingSession = await Session.findOne({
            userId: user._id,
            ipAddress,
            deviceName: userAgent,
        });

        if (existingSession) {
            // Return the existing token
            return res.status(200).json({ token: existingSession.token });
        }
   
        await Session.create({
            userId: user.id,
            deviceName: userAgent,
            ipAddress,
            token
        })
 
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({error: error.message})    
    }
})

// Get User details
router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // exlude password from resultset
        const profileImageUrl = user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}`: null
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({user, profileImageUrl})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

// Update user profile
router.put("/me", authenticate, upload.single("profileImage"), async (req, res) => {
    const { name, email } = req.body
    const profileImage = req.file ? req.file.filename : undefined;

    try {
        const updatedData = {}
        if(name) updatedData.name = name
        if(email) updatedData.email = email
        if(profileImage) updatedData.profileImage = profileImage

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