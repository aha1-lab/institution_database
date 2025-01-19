const express = require("express");
const router = express.Router();

const User = require("../models/user");

// ALl routes for application

// controllers/applications.js

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    console.log(currentUser.applications);
    res.render("applications/index.ejs", {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("applications/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    // const currentUser = await User.findByIdAndUpdate(req.session.user._id, {$push:{applications:req.body}})

    const currentUser = await User.findById(req.session.user._id);

    currentUser.applications.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications`);

    console.log(currentUser);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/:applicationId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    console.log(currentUser);

    const application = currentUser.applications.id(req.params.applicationId);

    console.log(application);

    res.render("applications/show.ejs", { application: application });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:applicationId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.applications.id(req.params.applicationId).deleteOne();

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:applicationId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render("applications/edit.ejs", {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:applicationId", async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);

  const application = currentUser.applications.id(req.params.applicationId);

  application.set(req.body);

  await currentUser.save();

  res.redirect(
    `/users/${currentUser._id}/applications/${req.params.applicationId}`
  );
});

module.exports = router;
