const multer = require("multer")
const path = require("path")


// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

// File filter to allow only images
const fileFilter = (req, file, cb)=> {
    const allowedTypes = ["images/jpeg", "image/png", "image/jpg"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only images are allowed"), false)
    }
 }

 // Multer instance
 const upload = multer({
    storage,
    limits: {fileSize: 2 * 1024 * 1024}, // Limit file size to 2MB
    fileFilter,
 })

 module.exports = upload;