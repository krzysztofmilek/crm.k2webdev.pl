const express = require("express");
const router = express.Router();
const cors = require("cors");



const indexViewControllerCustomer = require("../controllers/indexControllerCustomer");

router.get("/data/",  indexViewControllerCustomer.dataNow);
router.get(
  "/findData/?",
  indexViewControllerCustomer.customerFindData
);
router.post("/add", indexViewControllerCustomer.customerCreate);
router.delete(
  "/delete/:id",
  indexViewControllerCustomer.customerDelete
);
router.put(
  "/edit/:id",
  indexViewControllerCustomer.customerUpdate
);
router.get("/",  indexViewControllerCustomer.allCustomers);

module.exports = router;
