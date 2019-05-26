const router = require("express").Router();

// Model
const Person = require("../../models/Person");

// Middleware
const authMiddleware = require("../../middlewares/auth");

// @type - GET
// @route - /rent
// @desc - Display Rent Page
// @access - PRIVATE
router.get("/rent", authMiddleware, (req, res) => {
  const personId = req.session.userId;

  Person.find({ personId })
    .then(persons => {
      res.render("rent/index", { persons });
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
