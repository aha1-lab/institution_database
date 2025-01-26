const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  grade: { type: Number, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
