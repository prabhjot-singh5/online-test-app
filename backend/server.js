const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("FULL ERROR:");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/submit", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/results", async (req, res) => {
  try {
    const students = await Student.find().sort({ score: -1 });
    

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});