const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  degree: { type: String, required: true },
  university: { type: String, required: true },
  year: { type: String, required: true },
});

const workExperienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  skills: { type: [String], required: true },
  education: { type: [educationSchema], required: false },
  workExperience: { type: [workExperienceSchema], required: false },
  profilePicture: String, 
});

const User = mongoose.model("User", userSchema);
module.exports = User;
