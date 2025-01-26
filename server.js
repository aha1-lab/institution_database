// =======================
// 1. IMPORTS
// =======================
const express = require("express");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
//console.log("dev -branch")

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const coursesController = require("./controllers/courses.js");
const personController = require("./controllers/person.js");

const authContorller = require("./controllers/auth.js");
const enrollmentController = require("./controllers/enrollment.js");
const path = require("path");

// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal
// use session to use the use details

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DATABASE");
  })
  .catch(() => {
    console.log("ERROR CONNECTING TO DB OMAR");
  });

// =======================
// 4. ROUTES
// =======================

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.use(passUserToView);
app.use("/auth", authContorller);
app.use(isSignedIn);
app.use("/users/:user/courses", coursesController);
app.use("/users/:user/enrollments", enrollmentController);
app.use("/users/:user/persons", personController);

// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
