// labs/project-2/controllers/enrollments.js
const express = require("express");
const router = express.Router();
const Enrollment = require("../models/enrollments");

// Create a new enrollment
router.post("/", async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).send(enrollment);
    S;
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "firstName lastName")
      .populate("tutor", "firstName lastName")
      .populate("course", "name");
    res.render("enrollments/index.ejs", { enrollments });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get enrollment by ID
router.get("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("student", "firstName lastName")
      .populate("tutor", "firstName lastName")
      .populate("course", "name");
    if (!enrollment) return res.status(404).send("Enrollment not found");
    res.send(enrollment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update enrollment (only for admins)
router.patch("/:id", async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).send("Only admins can update enrollments");
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!enrollment) return res.status(404).send("Enrollment not found");
    res.send(enrollment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete enrollment (only for admins)
router.delete("/:id", async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).send("Only admins can delete enrollments");
    }

    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).send("Enrollment not found");
    res.send(enrollment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
