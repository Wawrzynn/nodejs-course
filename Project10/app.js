const path = require("path");
const hbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "views/handlebars/layouts/",
    extname: "hbs",
  })
);

//app.set("view engine", "pug"); pug view engine
//app.set("views", "views/pug/"); views for pug
app.set("view engine", "hbs");
app.set("views", "views/handlebars/");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(3000);
