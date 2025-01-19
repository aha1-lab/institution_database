const router = require("express").Router();
const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    topic:{
        type: String,
        enum:["AI", "Cybersecurity", "Data Science & Analytic", "Software Engineer", "UX/UI Design"]
    },
    catalog:{
        type: String,
        enum:["Bootcamp", "Short Course", "Workshop"]
    },
    studyType:{
        type: String,
        enum:["Online", "In class"]
    },
    duration:{
        type:Number,
        required: true
    }
});


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;