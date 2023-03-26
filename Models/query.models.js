const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    queryTitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },

    queryDescription: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", querySchema);
