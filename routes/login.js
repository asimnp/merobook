const router = require("express").Router();

// Middleware
const loginMiddleware = require("../middlewares/login");

// @type   - GET
// @route  - /auth/login
// @desc   - Display Login page
// @access - PUBLIC
router.get("/login", (req, res) => {
  res.render("login", {
    error: req.flash("loginError")
  });
});

// @type   - GET
// @route  - /auth/login
// @desc   -  Login to merobook
// @access - PUBLIC
router.post("/login", loginMiddleware, (req, res) => {
  res.redirect("/home");
});

module.exports = router;
