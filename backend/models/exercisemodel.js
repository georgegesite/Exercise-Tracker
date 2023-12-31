const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const exerciseSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // timestapms to when created and modified
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
