const mongoose = require("mongoose");

const CarModel = new mongoose.Schema(
  {
    new_used: String,
    title: String,
    type:String,
    description: String,
    body_type: String,
    make: String,
    model: String,
    generation: String,
    version: String,
    nr_rejestracyjny: String,
    registration: String,
    noCrash: String,
    date_registration: String,
    vin: String,
    door_count: Number,
    mileage: Number,
    year: Number,
    number_seats: Number,
    fuel_type: String,
    colour: String,
    lakier: String,
    engine_power: Number,
    engine_capacity: Number,
    gearbox: String,
    drive: String,
    status: String,
    imagesFilesName: [
      {
        type:String,
      },
    ],
    price: Number,
    carOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarOption",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarModel);
