const Offer = require("../models/OfferModel");
const Action = require("../models/ActionModel");



module.exports = {
  allOffer: (req, res) => {
    Offer.find(req.query)
      .populate("customer")
      .populate("user")
      .populate({ 
        path: 'car',
        populate: {
          path: 'carOptions'
        } 
      })
      .lean()
      .exec((err, allOffer) => {
        if (err) {
          res.send("Błąd pobrania danych");
        }
        res.json(allOffer);
      });
  },

  findOffer: (req, res) => {
    Offer.findById(req.params.id, req.body)
      .populate("customer")
      .populate("user")
      .populate("car")
      .lean()
      .exec((err, findOffer) => {
        if (err) {
          res.send("Błąd wyszukania");
        }
        res.json(findOffer);
      });
  },

  offerCreate: (req, res) => {
    console.log(req.body);
    let newOffer = new Offer({ ...req.body, action: req.body.action });
    newOffer.save();
    Action.updateOne(
      { _id: req.body.action },
      { $push: { offer: newOffer._id } },
      function (err, data) {
        console.log(err);
      }
    );
    res.json(newOffer);
  },

  offerDelete: (req, res) => {
    Offer.findByIdAndDelete(req.params.id).exec((err) => {
      if (err) {
        res.send("Błąd usuwania");
      }
      res.json({ deleted: true });
    });
  },

  offerUpdate: (req, res) => {
    Offer.findByIdAndUpdate(req.params.id, req.body).exec(
      (err, updateOffer) => {
        if (err) {
          res.send("Błąd aktualizacji");
        }
        res.json(updateOffer);
      }
    );
  },



};
