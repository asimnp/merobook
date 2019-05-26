const router = require("express").Router();

// Model
const Person = require("../../models/Person");

// Middleware
const authMiddleware = require("../../middlewares/auth");

// @type - GET
// @route - /rent/add
// @desc - Display Rent Person Page
// @access - PRIVATE
router.get("/add", authMiddleware, (req, res) => {
  res.render("rent/person");
});

// @type - POST
// @route - /rent/add
// @desc - Create new rent person
// @access - PRIVATE
router.post("/add", authMiddleware, (req, res) => {
  const person = req.body.person;
  const personId = req.session.userId;

  const newPerson = new Person({
    person,
    personId
  });

  newPerson
    .save()
    .then(() => {
      return res.redirect("/rent");
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
