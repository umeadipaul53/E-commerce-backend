const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./config/db");
const productRouter = require("./router/user.router");

const port = process.env.PORT || 3300;

const isProduction = process.env.NODE_ENV === "production";
const frontendURL = isProduction
  ? "https://ecommerce-wtfz.vercel.app/"
  : "http://localhost:3300";

app.use(
  cors({
    origin: frontendURL,
    credentials: true, // must match with Axios `withCredentials: true`
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "up and running",
  });
});

app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`currently running on PORT ${port}`);
});
