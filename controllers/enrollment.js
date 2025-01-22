// labs/project-2/controllers/enrollments.js
const express = require("express");
const router = express.Router();
const Enrollment = require("../models/enrollments");
const Person = require("../models/person.js");
const Course = require("../models/course.js");

// Create a new enrollment
router.post("/", async (req, res) => {
  try {
    const studentList = req.body.student;
    studentList.forEach(async (student)=>{
      req.body.lastModifiedBy = req.session.user._id;
      req.body.student = student;
      await Enrollment.create(req.body);
    })
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  }
});

// Get all enrollments
router.get("/", async (req, res) => {
  try {
    const foundEnrollments = await Enrollment.find()
    .populate("student")
    .populate("tutor")
    .populate("course");
    res.render("enrollments/index.ejs", {
       enrollments: foundEnrollments,
      });
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  }
});


router.get("/new", async (req, res)=>{
  try {
    const foundStudents = await Person.find({occupation : "Student"});
    const foundTutors = await Person.find({occupation : "Tutor"});
    const foundCourse = await Course.find();
    res.render("./enrollments/new.ejs",{
      students: foundStudents,
      tutors: foundTutors,
      courses: foundCourse,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  }

});


// Get enrollment by ID
router.get("/:id/edit", async (req, res) => {
  try {
    const foundEnrollment = await Enrollment.findById(req.params.id)
    .populate("student")
    .populate("tutor")
    .populate("course");
    res.render("enrollments/edit.ejs", {
       enrollment: foundEnrollment,
      });
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  }
});

// Update enrollment (only for admins)
router.put("/:id", async (req, res) => {
  try {
    const foundEnrollment = await Enrollment.findById(req.params.id)
    foundEnrollment.grade = req.body.grade;
    foundEnrollment.save();
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  }
});

// Delete enrollment (only for admins)
router.delete("/:id", async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/enrollments`);
  }
});

module.exports = router;
