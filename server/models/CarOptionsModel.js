const mongoose = require("mongoose");

const CarOptionsModel = new mongoose.Schema({
  category: String,
  nameOption: String
});

module.exports = mongoose.model("CarOption", CarOptionsModel);
