const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
  learned: {
    type: String,
    required: true,
  },
  struggled: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Entry", EntrySchema);
