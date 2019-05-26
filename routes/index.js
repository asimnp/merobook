const router = require("express").Router();

// @type   - GET
// @route  - /
// @desc   - Display index page
// @access - PUBLIC
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
