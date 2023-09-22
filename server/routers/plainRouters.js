const express = require("express");
const router = express.Router();


const indexViewControllerPlain = require("../controllers/indexControllerPlain"); //import kontrolera

router.post("/add", indexViewControllerPlain.plainCreate); //dodaje
router.delete(
  "/delete/:id",
  indexViewControllerPlain.plainDelete
);
router.get("/",  indexViewControllerPlain.allPlains); // wyświetla wszystkich
router.put("/edit/:id",  indexViewControllerPlain.plainUpdate); // aktualizacja

module.exports = router; // eksport całości
