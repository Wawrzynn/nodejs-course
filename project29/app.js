const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

//setup view engine
app.set("view engine", "ejs");

// connect to mongodb
mongoose
  .connect(keys.mongodb.dbURI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

//setup routes
app.use("/auth", authRoutes);

//home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
