const router = require("express").Router();

// Model
const Note = require("../../models/Note");

// Middleware
const authMiddlware = require("../../middlewares/auth");

// @type   - GET
// @route  - /note/add
// @desc   - Display Rent page
// @access - PRIVATE
router.get("/add", authMiddlware, (req, res) => {
  res.render("note/add");
});

// @type   - POST
// @route  - /note/add
// @desc   - Display Rent page
// @access - PRIVATE
router.post("/add", authMiddlware, (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({
    title,
    description,
    noteId: req.session.userId
  });

  newNote
    .save()
    .then(user => {
      res.redirect("/note");
    })
    .catch(err => console.log(err.message));
});

// @type   - DELETe
// @route  - /note/delete/:id
// @desc   - Display Note
// @access - PRIVATE
router.delete("/delete/:id", authMiddlware, (req, res) => {
  const _id = req.params.id;
  Note.findById({ _id }).then(note => {
    if (!note) {
      return res.redirect("/note");
    } else {
      note.deleteOne();
      return res.redirect("/note");
    }
  });
});

module.exports = router;
