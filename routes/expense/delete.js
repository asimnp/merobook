const router = require("express").Router();

// Middleware
const authMiddleware = require("../../middlewares/auth");

// Model
const Item = require("../../models/Item");
const Expense = require("../../models/Expense");

// @type - DELETE
// @route - /item/delete/:id
// @desc - Delete single item
// @access - PRIVATE
router.delete("/item/delete/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;

  Item.findById({ _id })
    .then(item => {
      if (!item) {
        return res.redirect(`/expense/item/${item.itemId}`);
      } else {
        item.deleteOne();
        return res.redirect(`/expense/item/${item.itemId}`);
      }
    })
    .catch(err => console.log(err.message));
});

// @type - DELETE
// @route - /expense/delete/:id
// @desc - Delete Single Expense
// @access - PRIVATE
router.delete("/expense/delete/:id", authMiddleware, (req, res) => {
  const _id = req.params.id;

  Expense.findById({ _id }).then(expense => {
    if (!expense) {
      return res.redirect("/expense");
    } else {
      expense.deleteOne();
      return res.redirect("/expense");
    }
  });
});

module.exports = router;
