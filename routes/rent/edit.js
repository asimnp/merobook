const router = require("express").Router();

// Model
const Rent = require("../../models/Rent");

// Middleware
const authMiddleware = require("../../middlewares/auth");

// @type - GET
// @route - /rent/item/:id
// @desc - Display Rent Edit Page
// @access - PRIVATE
router.get("/rent/item/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;

  Rent.findById({ _id })
    .then(rent => {
      if (!rent) {
        return res.redirect(`/rent/user/${rent.rentId}`);
      } else {
        return res.render(`rent/edit`, { rent });
      }
    })
    .catch(err => console.log(err.message));
});

// @type - PUT
// @route - /rent/item/:id
// @desc - Update the rent item
// @access - PRIVATE
router.put("/rent/item/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;
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

  Rent.findById({ _id })
    .then(rents => {
      if (!rents) {
        return res.redirect(`/rent/user/${rent.rentId}`);
      } else {
        rents.rent = rent;
        rents.estart = estart;
        rents.eend = eend;
        rents.wstart = wstart;
        rents.wend = wend;
        rents.internet = internet;
        rents.unit = unit;
        rents.garbage = garbage;
        rents.save();

        return res.redirect(`/rent/user/${rents.rentId}`);
      }
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
