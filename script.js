const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));

// You can make many middleware as many as you want
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

app.get("/", function (req, res) {
  res.render("index", { page: "01" }); //we can't use .ejs in the end only file name will be use.
});

app.get("/contact", function (req, res) {
  res.render("contact", { name: "Collaber's" });
});

app.get("/profile/:username", function (req, res) {
  res.render(`Hello from ${req.params.username}`);
});

app.get("/error", function (req, res, next) {
  throw new Error("Something went wrong!");
});

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(3000);
