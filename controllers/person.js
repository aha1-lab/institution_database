const router=require("express").Router()

const Person=require("../models/person.js")

router.get("/", async(req,res)=>{
    try {

        const allPersons= await Person.find()
        res.render("./person/index.ejs",{Person:allPersons})
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/newPerson", async (req,res)=>{
    res.render("person/createPerson.ejs")
})

router.post("/",async(req,res)=>{
    //req.body.owner = req.session.user._id
    console.log(req.body)

    const createdPersons = await Person.create(req.body)
    res.redirect("./persons")
})
router.get("/:personId", async (req,res)=>{
    try {
        const currentPerson=await Person.findById(req.params.personId)
        //const currentPerson=await currentUser.id(req.params.personId)
        //console.log(currentPerson)
        //console.log(currentPerson)
        res.render("./person/showperson.ejs",{onePerson:currentPerson})
    } catch (error) {
        console.log(error)
        res.redirect("./persons")
    }
})

router.delete("/:personId",async (req,res)=>{
    try{
        const currentPerson = await Person.findByIdAndDelete(req.params.personId)
        console.log(currentPerson)
        //currentPerson.deleteOne()
  
        //await currentPerson.save()
  
        res.redirect(`./persons`)
  
    }catch(error){
        console.log(error)
        res.redirect("./persons")
    }
  })
  
  router.get("/:personId/edit", async (req,res)=>{
    try {
        const currentPerson=await Person.findById(req.params.personId)
        res.render("./person/editPerson.ejs",{onePerson:currentPerson})
    } catch (error) {
        console.log(error)
        res.redirect("./person")
    }
  })
  router.put("/:personId", async (req,res)=>{
    try {
        const currentPerson=await Person.findByIdAndUpdate(req.params.personId,req.body)
        console.log(currentPerson)

        res.redirect("./persons")
    } catch (error) {
        console.log(error)
        res.redirect("./persons")
    }
  })
module.exports=router