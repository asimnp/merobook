const router = require("express").Router();

// Model
const Expense = require("../../models/Expense");
const Item = require("../../models/Item");

// Middleware
const authMiddlware = require("../../middlewares/auth");

// @type   - GET
// @route  - /expense
// @desc   - Display Expense page
// @access - PRIVATE
router.get("/expense", authMiddlware, (req, res) => {
  const expenseId = req.session.userId;

  Expense.find({ expenseId })
    .then(expenses => {
      res.render("expense/index", { expenses});
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
