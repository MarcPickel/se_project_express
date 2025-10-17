const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
