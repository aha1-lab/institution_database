const mongoose=require("mongoose")

const personSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        enum:["Student","Tutor"],
        required:true
    }
})

const Person= mongoose.model("person",personSchema)