const router=require("express").Router();

const Person = require("../models/person.js");
const Course = require("../models/course.js");
const Enrollment = require("../models/enrollments.js");

router.get("/", async(req,res)=>{
    try {

        const allPersons= await Person.find()
        res.render("person/index.ejs",{Person:allPersons})
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req.session.user._id}`)
    }
})

router.get("/newPerson", async (req,res)=>{
   
    res.render("person/createPerson.ejs")
})
router.get("/reactivatePerson", async (req,res)=>{
    const allPersons= await Person.find({active:false})
    console.log(allPersons)
    res.render("person/reactivate.ejs",{allPersons:allPersons})
})
router.post("/",async(req,res)=>{
    //req.body.owner = req.session.user._id
    
    try {
        //console.log(req.body)
        req.body.active=true
        const createdPersons = await Person.create(req.body)
        console.log(createdPersons)
        res.redirect(`/users/${req.session.user._id}/persons`)
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req.session.user._id}/persons`)
    }
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
        const currentPerson = await Person.findByIdAndUpdate(req.params.personId,{active:false})
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
  // put method to update person
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
  // put method to reactivate a deactive person
  router.put("/toggle-user/:personId", async(req,res)=>{
    try {
        const deactivePerson=await Person.findByIdAndUpdate(req.params.personId,{active:true})
        console.log(deactivePerson)

        res.redirect(`/users/${req.session.user._id}/persons`)
    } catch (error) {
        console.log(error)
        res.redirect(`/users/${req/session.user._id}/persons`)
    }
  })
module.exports=router