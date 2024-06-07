require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userProfileRoutes = require("./routes/userProfile");
const jobRoutes = require("./routes/jobRoutes")
const jobSeekerRoutes = require("./routes/jobSeekersRoute");


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/userProfiles", userProfileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobseekers", jobSeekerRoutes);


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
