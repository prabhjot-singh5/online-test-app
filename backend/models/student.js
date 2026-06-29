const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    rollNo: {
      type: String,
      unique: true,
    },
    course: String,
    score: Number,
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Student", studentSchema);