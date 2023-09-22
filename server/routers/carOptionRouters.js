const express = require("express");
const router = express.Router();



const indexViewControllerCarOption = require("../controllers/indexControllerCarOption"); 
router.get(
  "/get/:category",
  indexViewControllerCarOption.carOptions
); 
router.get("/", indexViewControllerCarOption.allCarOptions); 

module.exports = router; 
