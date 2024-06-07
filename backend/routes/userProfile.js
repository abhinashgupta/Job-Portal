const express = require("express");
const multer = require("multer");
const path = require("path");
const UserProfile = require("../models/User");
const fs = require("fs");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/data/:id", async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/data/:id", async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/data/:id/profilePicture",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const userProfile = await UserProfile.findById(req.params.id);
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
    
      userProfile.profilePicture = req.file.filename;
      await userProfile.save();
      res.json({
        message: "Profile picture uploaded successfully",
        profilePicture: req.file.filename,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
