// const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const newone = Math.random() * 100;
console.log(newone);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./router");
const session = require("express-session");

app.set("view engine", "ejs");

//load static assets
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/asset", express.static(path.join(__dirname, "public/asset")));

app.use(
  session({
    secret: newone.toString(),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(router);

// app.use((req,res,next)=>{
//   res.setHeader('Cache-Control','no-cache,no-store,must-revalidate')
//   next()
// })

//home route
app.get("/", (req, res) => {
  if (req.session.user) {
    console.log(req.session.user)
    res.render("dashboard");
  
  }
  if (req.session.msg) {
    let msg = req.session.msg;
    res.render("login", { title: "Login System", msg: msg });
  } else {
    res.render("login", { title: "Login System" });
  }
});

app.listen(port, () => {
  console.log("Listening to the server");
});
