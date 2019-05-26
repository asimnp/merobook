const router = require("express").Router();

// Model
const Person = require("../../models/Person");
const Rent = require("../../models/Rent");

// Middleware
const authMiddleware = require("../../middlewares/auth");

// @type - DELETE
// @route - /rent/delete/:id
// @desc - Delete Rent User
// @access - PRIVATE
router.delete("/rent/delete/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;

  Person.findById({ _id }).then(person => {
    if (!person) {
      return res.redirect("/rent");
    } else {
      person.deleteOne();
      return res.redirect("/rent");
    }
  });
});

// @type - DELETE
// @route - /rent/item/:id
// @desc - Delete Rent User
// @access - PRIVATE
router.delete("/rent/item/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;
  Rent.findById({ _id }).then(rent => {
    if (!rent) {
      return res.redirect(`/rent/user/${rent.rentId}`);
    } else {
      rent.deleteOne();
      return res.redirect(`/rent/user/${rent.rentId}`);
    }
  });
});

module.exports = router;
