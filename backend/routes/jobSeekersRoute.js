const express = require("express");
const router = express.Router();
const User = require("../models/User"); 

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "jobseeker" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/search", async (req, res) => {
  const { skills, experience, education } = req.query;

  let query = {
    role: "jobseeker", 
  };

  if (skills) {
    query.skills = { $in: skills.split(",") };
  }

  if (experience) {
    query["workExperience.startDate"] = { $lte: new Date() };
    query["workExperience.endDate"] = {
      $gte: new Date(
        new Date().setFullYear(new Date().getFullYear() - experience)
      ),
    };
  }

  if (education) {
    query["education.degree"] = education;
  }

  try {
    const jobSeekers = await User.find(query);
    res.json(jobSeekers);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;

