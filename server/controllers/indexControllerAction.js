const Action = require("../models/ActionModel");
const Customer = require("../models/CustomerModel");

module.exports = {
  allAction: (req, res) => {
    Action.find(req.query)
      .populate("customer")
      .populate("user")
      .populate("offer")
      .lean()
      .exec((err, allAction) => {
        if (err) {
          res.send("Błąd pobrania danych");
        }
        res.json(allAction);
      });
  },

  findAction: (req, res) => {
    Action.findById(req.params.id, req.body)
      .populate("customer")
      .populate("user")
      .populate("offer")
      .lean()
      .exec((err, findAction) => {
        if (err) {
          res.send("Błąd wyszukania");
        }
        res.json(findAction);
      });
  },

  actionCreate: (req, res) => {
    let newAction = new Action({ ...req.body, customer: req.body.customer });
    newAction.save();
    Customer.updateOne(
      { _id: req.body.customer },
      { $push: { action: newAction._id } },
      function (err, data) {
        console.log(err);
      }
    );
    res.json(newAction);
  },

  actionDelete: (req, res) => {
    Action.findByIdAndDelete(req.params.id).exec((err) => {
      if (err) {
        res.send("Błąd usuwania");
      }
      res.json({ deleted: true });
    });
  },

  actionUpdate: (req, res) => {
    Action.findByIdAndUpdate(req.params.id, req.body).exec(
      (err, updateAction) => {
        if (err) {
          res.send("Błąd aktualizacji");
        }
        res.json(updateAction);
      }
    );
  },
};
