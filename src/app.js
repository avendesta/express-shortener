// module imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// my module imports
const config = require("./config");
// initialization
const app = express();
// settings and configurations
app.disable("x-powered-by");
const port = config.PORT;
// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.dbURL);

const { User } = require("./resources/user/user.model");
const p1 = new User({
  _id: new mongoose.Types.ObjectId(),
  email: "john@mail.com",
  password: "Winter Jacket",
});

p1.save()
  .then((r) => console.log(r))
  .catch((e) => console.error("Error ", e));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// run server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
