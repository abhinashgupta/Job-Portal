const express = require("express");
const router = express.Router();
const Job = require("../models/Job"); 

router.post("/post", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send({ message: "Failed to post job", error });
  }
});

router.get("/recruiter/:recruiterId", async (req, res) => {
  try {
    const jobs = await Job.findOne({recruiterId: req.params.recruiterId });
    res.send(jobs);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch job listings", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch job listings", error });
  }
});

module.exports = router;
