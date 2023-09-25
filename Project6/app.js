const express = require("express");

const app = express();

app.use("/add", (req, res, next) => {
    console.log("In add middleware!");
    res.send("<h1>The add page</h1>");
  });

app.use("/", (req, res, next) => {
  console.log("In middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
