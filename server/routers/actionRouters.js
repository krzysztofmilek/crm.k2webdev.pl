const express = require("express");
const router = express.Router();

const indexViewControllerAction = require("../controllers/indexControllerAction");

router.post("/add", indexViewControllerAction.actionCreate);
router.delete(
  "/delete/:id",
  indexViewControllerAction.actionDelete
);
router.get("/", indexViewControllerAction.allAction);
router.put("/edit/:id", indexViewControllerAction.actionUpdate);
router.put("/find/:id",  indexViewControllerAction.findAction);
module.exports = router;
