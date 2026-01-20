const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 👇 CHANGE 1: Routes wali file ko import kiya
const authRoutes = require("./routes/auth");

// 1. Load the secret .env file
dotenv.config();

const app = express();
// Use 5000 if declared in .env, otherwise use 5000 as default
const PORT = process.env.PORT || 5000;

// 2. Connect to MongoDB
const connectDB = async () => {
  try {
    // Make sure .env file mein MONGO_URI sahi ho
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Call the connection function
connectDB();

// Middleware (Allows frontend to talk to backend)
app.use(cors());
app.use(express.json());

// 👇 CHANGE 2: Routes ko enable kiya
// Ab frontend request karega: http://IP:5000/api/auth/signup
app.use("/api/auth", authRoutes);

// Base Route (Testing ke liye)
app.get("/", (req, res) => {
  res.send("API is running and DB is connected! 🚀");
});

// Start Server
// '0.0.0.0' ka matlab hai: Network par kisi bhi device se request aane do
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT} and accessible to Network`);
});
