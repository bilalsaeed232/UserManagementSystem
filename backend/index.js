const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes")
const sessionRoutes = require("./routes/sessionRoutes")

dotenv.config();

// Allow requests from specific origins
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend app's URL (or use '*' to allow all origins)
    methods: 'GET,POST',  // Methods allowed
    allowedHeaders: 'Content-Type,Authorization',  // Allowed headers
    credentials: true  // Enable cookies/credentials if necessary
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/users", userRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/uploads", express.static("uploads"))

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
