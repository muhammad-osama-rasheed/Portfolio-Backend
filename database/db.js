const mongoose = require("mongoose");

const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error: ", error);
  });
