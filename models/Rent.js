const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema({
  rent: {
    type: Number,
    required: true
  },
  estart: {
    type: Number,
    required: true
  },
  eend: {
    type: Number,
    required: true
  },
  wstart: {
    type: Number,
    required: true
  },
  wend: {
    type: Number,
    required: true
  },
  internet: {
    type: Number,
    default: 0
  },
  unit: {
    type: Number,
    required: true
  },
  garbage: {
    type: Number,
    default: 0
  },
  rentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Rent", RentSchema);
