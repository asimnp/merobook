const router = require("express").Router();

// Model
const Expense = require("../../models/Expense");

// Middleware
const authMiddlware = require("../../middlewares/auth");

// @type   - GET
// @route  - /expense/add
// @desc   - Display Expense page
// @access - PRIVATE
router.get("/add", authMiddlware, (req, res) => {
  res.render("expense/add");
});

// @type   - POST
// @route  - /expense/add
// @desc   - Create New Expense
// @access - PRIVATE
router.post("/add", authMiddlware, (req, res) => {
  const expenseId = req.session.userId;

  const { title, budget } = req.body;

  const newExpense = new Expense({
    title,
    budget,
    expenseId
  });

  newExpense
    .save()
    .then(() => {
      res.redirect("/expense");
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
