const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
mongoose.connection
  .on("open", () => {
    console.log("connected to the database successfully");
  })
  .once("error", () => {
    console.log("failed to connect to database");
  });

module.exports = mongoose;
