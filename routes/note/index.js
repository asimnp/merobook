const router = require("express").Router();

// Model
const Note = require("../../models/Note");

// Middleware
const authMiddlware = require("../../middlewares/auth");

// @type   - GET
// @route  - /note
// @desc   - Display Note page
// @access - PRIVATE
router.get("/note", authMiddlware, (req, res) => {
  const noteId = req.session.userId;
  Note.find({ noteId })
    .then(notes => {
      res.render("note/index", { notes });
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
