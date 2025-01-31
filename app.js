const express = require("express");
const app = express();

const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET, POST, PUT, DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

require("dotenv").config();
const db = require("./database/db");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const progressRoutes = require("./routes/progressRoutes");
app.use("/progress", progressRoutes);

const skillsRoutes = require("./routes/skillsRoutes");
app.use("/skills", skillsRoutes);

// app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send(
    "Hi i am Muhammad Osama, This is the Backend for my personal Portfolio."
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
