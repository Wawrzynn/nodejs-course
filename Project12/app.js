const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
const users = [];

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Main Page" });
});

app.post("/", (req, res, next) => {
  console.log(req.body.name);
  users.push({ name: req.body.name });
});

app.get("/users", (req, res, next) => {
  res.render("users", { pageTitle: "Users Page", users: users });
});

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
