require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // Parse JSON bodies

// Database connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/entries", require("./routes/entries"));

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ msg: "Resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
