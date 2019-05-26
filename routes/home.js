const router = require("express").Router();

// Middleware
const authMiddleware = require("../middlewares/auth");

// @type   - GET
// @route  - /home
// @desc   - Display Home page
// @access - PRIVATE
router.get("/home", authMiddleware, (req, res) => {
  res.render("home");
});

module.exports = router;
