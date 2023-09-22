const express = require("express");
const router = express.Router();

const indexViewControllerOffer = require("../controllers/indexControllerOffer");


router.post("/add", indexViewControllerOffer.offerCreate);
router.delete(
  "/delete/:id",
  indexViewControllerOffer.offerDelete
);
router.get("/", indexViewControllerOffer.allOffer);
router.put("/edit/:id",  indexViewControllerOffer.offerUpdate);
router.put("/find/:id",  indexViewControllerOffer.findOffer);
module.exports = router;