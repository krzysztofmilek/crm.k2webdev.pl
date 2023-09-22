const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema(
  {
    city: String,
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    phone: { type: String, require: true },
    street: String,
    zip: String,
    agreement_1: Boolean,
    data: Date,
    active: Boolean,
    NIP: String,
    nameCompany: String,
    action: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
      },  
     user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerModel);
