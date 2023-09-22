const express = require("express");
const router = express.Router();
const cors = require("cors");


const indexViewControllerCar = require("../controllers/indexControllerCar");


router.get("/findData/?",  indexViewControllerCar.carFindData);
router.post("/add", indexViewControllerCar.carCreate);
router.delete("/delete/:id", indexViewControllerCar.carDelete);
router.put("/edit/:id",  indexViewControllerCar.carUpdate);
router.get("/", indexViewControllerCar.allCars);

module.exports = router;
