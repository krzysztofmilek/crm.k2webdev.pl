const express = require("express");
const router = express.Router();
const cors = require("cors");

const indexViewControllerUser = require('../controllers/indexControllerUser');


router.get('/findData/:id', indexViewControllerUser.findData);
router.post('/addUser',  indexViewControllerUser.create); 
router.delete('/delete/:id',  indexViewControllerUser.delete);
router.get('/allUser/', indexViewControllerUser.allUsers); 
router.put('/edit/:id', indexViewControllerUser.update);
router.put('/changePassword/:id',  indexViewControllerUser.changePassword);


module.exports = router; 


