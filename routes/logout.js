const express = require("express");
const router = express.Router();

// Middleware
const authMiddleware = require("../middlewares/auth");

// @type - GET
// @route - /logout
// @desc - Display Logout Page
router.get("/logout", authMiddleware, (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
