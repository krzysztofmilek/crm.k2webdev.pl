const mongoose = require("mongoose");

const CompanyDataModel= new mongoose.Schema(
  {
    nameCompany: String,
    streetAdress: String,
    zipAdress: String,
    cityAdress: String,
    emailCompany: String,
    phoneCompany: String,
    phoneDepartment: String,
    NIP: String,
    REGON: String,
    bankAccount: String,
    siteWWW: String,  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanyDataModel);
