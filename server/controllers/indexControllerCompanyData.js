const jwt = require("jsonwebtoken");
const Company = require("../models/CompanyDataModel");


module.exports = {
  //Users Endpoint.............................................

  allCompanies: (req, res) => {
    Company.find(req.query)
      .lean()
      .exec((err, allCompany) => {
        if (err) {
          res.send("Błąd pobrania")
        }
        res.json(allCompany);
      });
  },



  create: (req, res) => {
    let newCompany = new Company(req.body);
    newCompany.save((err) => {
      if (err) {
        res.send("Błąd dodawania użytkownika");
        
      } else {
        res.json(newCompany);
      }
    });
  },

  companyUpdate: (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body).exec(
      (err, updateCompany) => {
        if (err) {
          res.send("Błąd aktualizacji");
        }
        res.json(updateCompany);
      
      }
    );
  },



};

