const router=require("express").Router();

const Person = require("../models/person.js");
const Course = require("../models/course.js");
const Enrollment = require("../models/enrollments.js");

router.get("/", async(req,res)=>{
    try {

        const allPersons= await Person.find()
        res.render("person/index.ejs",{Person:allPersons})
    } catch (error) {
        
    }
})

router.get("/newPerson", async (req,res)=>{
    res.render("person/createPerson.ejs")
})

router.post("/",async(req,res)=>{
    //req.body.owner = req.session.user._id
    console.log(req.body)

    const createdPersons = await Person.create(req.body)
    res.redirect(`/users/${req.session.user._id}/persons`)
})
router.get("/:personId", async (req,res)=>{
    try {
        const currentPerson = await Person.findById(req.params.personId)
        const foundEnrollment = await Enrollment.find({student: req.params.personId}).populate("course");
        console.log(foundEnrollment);

        res.render("person/showperson.ejs",{
            onePerson : currentPerson,
            enrollments : foundEnrollment,
        });
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req.session.user._id}/persons`)
    }
})

router.delete("/:personId",async (req,res)=>{
    try{
        const currentPerson = await Person.findByIdAndDelete(req.params.personId)
        console.log(currentPerson)
        //currentPerson.deleteOne()
  
        //await currentPerson.save()
  
        res.redirect(`/users/${req.session.user._id}/persons`)
  
    }catch(error){
        console.log(error)
        res.redirect(`/users/${req.session.user._id}/persons`)
    }
  })
  
  router.get("/:personId/edit", async (req,res)=>{
    try {
        const currentPerson=await Person.findById(req.params.personId)
        res.render("person/editPerson.ejs",{onePerson:currentPerson})
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req.session.user._id}/persons`)
    }
  })
  router.put("/:personId", async (req,res)=>{
    try {
        const currentPerson=await Person.findByIdAndUpdate(req.params.personId,req.body)
        console.log(currentPerson)

        res.redirect(`/users/${req.session.user._id}/persons`)
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req.session.user._id}/persons`)
    }
  })
module.exports=router