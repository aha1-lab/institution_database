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
        res.redirect("`/users/${req.session.user._id}/courses`");
    }
    
});

router.get("/new", (req, res)=>{
    res.render("courses/new.ejs", {
        course:courseSelectionList
    });
});

router.get("/reactivateCourse", async (req,res)=>{
    const allCourses= await Course.find({active:false})
    console.log(allCourses)
    res.render("courses/reactivate.ejs",{allCourses:allCourses})
})

router.post("/", async(req, res)=>{
    try {
        req.body.active=true
        await Course.create(req.body);
        res.redirect(`/users/${req.session.user._id}/courses`);
    } catch (error) {
        console.log(error);
        res.redirect("`/users/${req.session.user._id}/courses`");
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
        res.redirect("`/users/${req.session.user._id}/courses`");
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
        res.redirect("`/users/${req.session.user._id}/courses`");
    }
});
// put to update code
router.put("/:itemId", async(req, res)=>{
    try {
        const foundCourse = await Course.findById(req.params.itemId);
        console.log(req.body);
        foundCourse.set(req.body);
        await foundCourse.save();
        res.redirect(`/users/${req.session.user._id}/courses/${req.params.itemId}`);
    } catch (error) {
        console.log(error);
        res.redirect("`/users/${req.session.user._id}/courses`");
    }
});
router.put("/toggle-user/:personId", async(req,res)=>{
    try {
        const deactiveCourse=await Course.findByIdAndUpdate(req.params.personId,{active:true})
        console.log(deactiveCourse)

        res.redirect(`/users/${req.session.user._id}/courses`)
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req/session.user._id}/courses`)
    }
  })
router.delete("/:itemId", async(req, res)=>{
    try {
        await Course.findByIdAndUpdate(req.params.itemId,{active:false});
        res.redirect(`/users/${req.session.user._id}/courses`);
    } catch (error) {
        console.log(error);
        res.redirect("`/users/${req.session.user._id}/courses`");
    }
});
module.exports = router;