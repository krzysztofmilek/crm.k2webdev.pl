const mongoose = require("mongoose");

const TemponaryFileModel = new mongoose.Schema(
  {
    Arkusz1: [
      {
        A: String,
        B: String,
        C: String,
        D: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Temp", TemponaryFileModel);
