const express = require("express");
const router = express.Router();

const indexViewControllerTemp = require('../controllers/indexControllerTemponary'); //import kontrolera


router.post('/add',indexViewControllerTemp.tempCreate); //dodaje 
router.patch('/delete/:id', indexViewControllerTemp.tempDelete);
router.get('/', indexViewControllerTemp.allTemp); // wyświetla wszystkich 
router.put('/edit/:id',  indexViewControllerTemp.tempUpdate); // aktualizacja 
router.delete('/deleteCollection/:id',indexViewControllerTemp.tempCollectionDelete);

module.exports = router; // eksport całości


