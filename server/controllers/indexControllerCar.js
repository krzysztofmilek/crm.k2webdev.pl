const express = require("express");
const router = express.Router();
const Car = require("../models/CarModel");
const CarOption = require("../models/CarOptionsModel");
const fs = require("fs-extra");

module.exports = {
  allCars: (req, res) => {
    console.log(req.body);
    Car.find(req.query)
      .populate("carOptions")
      .lean()
      .exec((err, allCar) => {
        if (err) {
          res.send("Błąd pobrania użykowników");
        }
        res.json(allCar);
        console.log(allCar)
      });
  },

  carFindData: (req, res) => {
    console.log(req.params.id)
    Car.findById(req.params.id, req.bod)
     .populate("carOptions") 
      .lean()
      .exec((err, carFindData) => {
        if (err) {
          res.send("Błąd wyszukania");
          return
        }
        res.json(carFindData);
      
      });
  },






  carCreate: (req, res) => {
    let newCar = new Car(req.body);
    newCar
      .save()
      .then(() => {
        res.json(newCar);
 
         })
      .catch((err) => {
        res.json({ error: true });
      });
  },

  carDelete: (req, res) => {
    Car.findByIdAndDelete(req.params.id).exec((err) => {
      if (err) {
        res.send("Błąd usuwania samochodu");
      }
      res.json({ deleted: true });
    });
  },

  carUpdate: (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body).exec((err, updateCar) => {
      if (err) {
        res.send("Błąd aktualizacji");
      }
      res.json(updateCar);
    });
  },
};
