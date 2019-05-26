const router = require("express").Router();

// Model
const Rent = require("../../models/Rent");

// Middleware
const authMiddleware = require("../../middlewares/auth");

// @type - GET
// @route - /rent/add/:id
// @desc - Display Rent Add Page
// @access - PRIVATE
router.get("/:id", authMiddleware, (req, res) => {
  const rentId = req.params.id;
  res.render("rent/add", { rentId });
});

// @type - POST
// @route - /rent/add/:id
// @desc - Create New Add Page
// @access - PRIVATE
router.post("/:id", authMiddleware, (req, res) => {
  const rentId = req.params.id;
  const {
    rent,
    estart,
    eend,
    wstart,
    wend,
    internet,
    unit,
    garbage
  } = req.body;

  const newRent = new Rent({
    rent,
    estart,
    eend,
    wstart,
    wend,
    internet,
    unit,
    garbage,
    rentId
  });

  newRent
    .save()
    .then(() => {
      return res.redirect(`/rent/user/${rentId}`);
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
