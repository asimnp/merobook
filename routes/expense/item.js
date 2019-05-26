const router = require("express").Router();

// Model
const Expense = require("../../models/Expense");
const Item = require("../../models/Item");

// Middleware
const authMiddlware = require("../../middlewares/auth");

// @type   - GET
// @route  - /expense/item/:id
// @desc   - Display Expense page
// @access - PRIVATE
router.get("/:id", authMiddlware, (req, res) => {
  const _id = req.params.id;
  const itemId = req.params.id;
  Expense.findById({ _id })
    .then(expense => {
      Item.find({ itemId })
        .then(items => {
          var sum = 0;
          items.forEach(item => {
            sum += item.price;
            return sum;
          });

          res.render("expense/item", { expense, items, sum });
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
});

// @type   - GET
// @route  - /expense/item/:id
// @desc   - Display Expense page
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
    .then(() => {
      res.redirect("/expense");
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
