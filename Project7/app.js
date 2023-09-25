const express = require("express");

const app = express();

//First assignment
// app.get('/', (req, res, next) => {
//     console.log("First console log");
//     next();
// });

// app.get('/', (req, res, next) => {
//     console.log("Second console log");
//     res.send("<h1>Home page</h1>");
// });

//Second assignment
app.use("/users", (req, res, next) => {
  res.send("<h1>Users page</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Home page</h1>");
});

app.listen(3000);
