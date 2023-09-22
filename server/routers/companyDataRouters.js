const express = require("express");
const router = express.Router();


const indexViewControllerCompany = require("../controllers/indexControllerCompanyData"); 
router.post("/add",  indexViewControllerCompany.create); 
router.get("/", indexViewControllerCompany.allCompanies); 
router.put(
  "/changeCompanyData/:id",
  indexViewControllerCompany.companyUpdate
); 

module.exports = router; 
