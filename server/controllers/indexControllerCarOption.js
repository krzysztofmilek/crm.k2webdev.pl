const CarOption = require("../models/CarOptionsModel");  

module.exports = {
  allCarOptions: (req, res) => {
    CarOption.find(req.query)
      .lean()
      .exec((err,  allCarOption) => {
       
        if (err) {
          res.send("Błąd pobrania użykowników");
        }
        res.json( allCarOption);
      });
  },
  carOptions: (req, res) => {
    console.log(req.params)
    CarOption.findOne(req.query)
      .lean()
      .exec((err,  allCarOption) => {
       
        if (err) {
          res.send("Błąd pobrania użykowników");
        }
        res.json( allCarOption);
      });
  },
}

