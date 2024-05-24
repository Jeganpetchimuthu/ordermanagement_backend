const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const connect = mongoose.connection;

try {
  connect.on("open", () => {
    console.log("mongoDB connected!!!");
  });
} catch (error) {
  console.log("Error: " + error);
}
app.use(bodyParser.json());
app.use(cors());
const userRouter = require("./routers/user");
app.use("/api", userRouter);

const productRouter = require("./routers/product");
app.use("/api", productRouter);

const customerRouter = require("./routers/Customer");
app.use("/api", customerRouter);

const orderRouter = require("./routers/Order");
app.use("/api", orderRouter);

const stockRouter = require("./routers/Stock");
app.use("/api", stockRouter);

app.get("/read", (req, res) => {
  res.send("Hello all welcome!!!!");
});

app.listen(PORT, () => {
  console.log("The node Application is Running on " + PORT);
});
