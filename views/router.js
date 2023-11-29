var express = require("express");
var router = express.Router();

const credential = {
  email: "soorajhari@gmail.com",
  password: "sree123",
};

//login user
router.post("/login", (req, res) => {
  if (req.body.email != credential.email) {
    const msg = "Enter a valid email";
    req.session["msg"] = msg;
    res.redirect("/");
  } else if (req.body.password != credential.password) {
    const msg = "Enter a valid password";
   
    res.redirect("/" ,msg);
  } else {
    let sess = req.session;
    console.log(sess)
    sess.user = req.body.email;
    res.redirect("/");
  }
});
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (email === credential.email && password === credential.password) {
//     req.session.user = req.body.email;
//     res.redirect("/");
//     // res.end("login Succesful");
//   } else {
//     // res.render( { errmsg });
//     // errmsg = "Invalid email or password";
//     // res.end("invalid username");
//     // res.render("index");
//     res.redirect("/");
//   }
// });

// //route dashboard
// router.get("/dashboard", (req, res) => {
//   if (req.session.user) {
//     res.render("dashboard", { user: req.session.user });
//     // res.redirect("/");
//   } else {
//     // res.send("unauthorized author");
//     // res.render("index");
//     res.redirect("/");
//   }
// });

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      // res.render("index", { title: "Express", logout: "logout successfully" });
      res.clearCookie("connect.sid");
      res.redirect("/");
    }
  });
});
module.exports = router;
