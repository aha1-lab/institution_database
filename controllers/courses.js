const router = require("express").Router();
const Course = require("../models/course.js");

courseSelectionList ={
    topic:["AI", "Cybersecurity", "Data Science & Analytic", "Software Engineer", "UX/UI Design"],
    catalog:["Bootcamp", "Short Course", "Workshop"],
    studyType:["Online", "In class"],
};

router.get("/", async (req, res)=>{
    try {
        const allCourses = await Course.find();
        res.render("./courses/index.ejs",{
            courses : allCourses,
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
    
});

router.get("/new", (req, res)=>{
    res.render("courses/new.ejs", {
        course:courseSelectionList
    });
});


router.post("/", async(req, res)=>{
    try {
        await Course.create(req.body);
        res.redirect("/courses");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});


router.get("/:itemId", async(req, res)=>{
    try {
        const foundCourse = await Course.findById(req.params.itemId);
        res.render("./courses/show.ejs",{
            course: foundCourse,
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.get("/:itemId/edit", async(req, res)=>{
    try {
        const foundCourse = await Course.findById(req.params.itemId);
        res.render("./courses/edit.ejs",{
            course: foundCourse,
            courseEnum : courseSelectionList,
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.put("/:itemId", async(req, res)=>{
    try {
        const foundCourse = await Course.findById(req.params.itemId);
        console.log(req.body);
        foundCourse.set(req.body);
        await foundCourse.save();
        res.redirect(`/courses/${req.params.itemId}`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.delete("/:itemId", async(req, res)=>{
    try {
        await Course.findByIdAndDelete(req.params.itemId);
        res.redirect(`/courses`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});
module.exports = router;