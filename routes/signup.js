const router = require("express").Router();
const bcrypt = require("bcryptjs");

// Model
const User = require("../models/User");

// Middlware
const signupMiddlware = require("../middlewares/signup");

// @type   - GET
// @route  - /auth/signup
// @desc   - Display Signup page
// @access - PUBLIC
router.get("/signup", (req, res) => {
  res.render("signup", {
    error: req.flash("signupError")
  });
});

// @type   - POST
// @route  - /auth/signup
// @desc   - Create New User
// @access - PUBLIC
router.post("/signup", signupMiddlware, (req, res) => {
  // Destruct req.body
  const { name, email, password } = req.body;

  //  Create & Assign new User
  const newUser = new User({
    name,
    email,
    password
  });

  // Hash Password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      newUser.password = hash;

      newUser
        .save()
        .then(() => {
          res.redirect("/auth/login");
        })
        .catch(err => console.log(err.message));
    });
  });
});

module.exports = router;
