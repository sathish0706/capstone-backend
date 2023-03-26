const mongoose = require("mongoose");

const capstoneSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    capstoneTitle: {
      type: String,
      required: true,
      trim: true,
    },
    batch: {
      type: String,
      required: true,
      trim: true,
    },

    capstoneDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capstone", capstoneSchema);
