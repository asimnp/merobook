const router = require("express").Router();

// Model
const Person = require("../../models/Person");
const Rent = require("../../models/Rent");

// Middleware
const authMiddleware = require("../../middlewares/auth");

// @type   - GET
// @route  - /rent/user/:id
// @desc   - Display Single User Rent
// @access - PRIVATE
router.get("/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;
  const rentId = req.params.id;

  Person.findById({ _id })
    .then(person => {
      if (!person) {
        res.render("rent/index");
      } else {
        Rent.find({ rentId })
          .sort({ date: -1 })
          .then(rents => {

            return res.render("rent/rentItem", { person, rents });
          })
          .catch(err => console.log(err.message));
      }
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
