const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  person: {
    type: String,
    required: true
  },
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Person", PersonSchema);
