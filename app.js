const express = require("express");
const app = express();

const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

require("dotenv").config();
const db = require("./database/db");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const path = require("path");
// const rootDir = require("./utils/pathUtil");

app.use(bodyParser.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const progressRoutes = require("./routes/progressRoutes");
app.use("/progress", progressRoutes);

const skillsRoutes = require("./routes/skillsRoutes");
app.use("/skills", skillsRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/contact", contactRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/profile", profileRoutes);

const blogRoutes = require("./routes/blogRoutes");
app.use("/blog", blogRoutes);

const educationRoutes = require("./routes/educationRoutes");
app.use("/education", educationRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/service", serviceRoutes);

const certificateRoutes = require("./routes/certificateRoutes");
app.use("/certificate", certificateRoutes);

const projectRoutes = require("./routes/projectRoutes");
app.use("/project", projectRoutes);

const aboutRoutes = require("./routes/aboutRoutes");
app.use("/about", aboutRoutes);

// app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
