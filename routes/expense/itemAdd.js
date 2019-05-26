const router = require("express").Router();

// Model
const Item = require("../../models/Item");

// Middleware
const authMiddlware = require("../../middlewares/auth");

// @type   - GET
// @route  - /item/add/:id
// @desc   - Display Item page
// @access - PRIVATE
router.get("/:id", authMiddlware, (req, res) => {
  const id = req.params.id;
  res.render("expense/itemAdd", { id });
});

// @type   - POSt
// @route  - /item/add/:id
// @desc   - Create New Item
// @access - PRIVATE
router.post("/:id", authMiddlware, (req, res) => {
  const { item, price } = req.body;
  const newItem = new Item({
    item,
    price,
    itemId: req.params.id
  });

  newItem
    .save()
    .then(item => {
      const id = item.itemId;
      res.redirect(`/expense/item/${id}`);
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
