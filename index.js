const express = require("express");
const PORT = 3300;
const app = express();
require("dotenv").config();
require("./config/db");
const productRouter = require("./router/user.router");

app.get("/", (req, res) => {
  res.json({
    message: "up and running",
  });
});

app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log(`currently running on PORT ${PORT}`);
});
