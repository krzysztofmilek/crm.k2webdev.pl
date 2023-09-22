const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs-extra");
const excelToJson = require("convert-excel-to-json");
const moment = require("moment");
const axios = require("axios");
const mongoose = require("mongoose");
const today = moment().format("YYYYMMDDHHmmss");
const dayNow = moment().format("YYYYMMDD");

const folderName = `public/import/importImages/`;
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log("UTWORZONO FOLDER");
  }
} catch (err) {
  console.error(err);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = `public/import/importImages/${req.body.carId}`;
    console.log(req.body);
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        console.log("UTWORZONO FOLDER");
      }
    } catch (err) {
      console.error(err);
    }

    cb(null, `public/import/importImages/${req.body.carId}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({ storage: storage });


const uploadCustomerFile = multer({ dest: "public/import/importCustomerFile" });
const upload = multer({ dest: "public/import/importExcelChance/" });
const nameFile = "data.xlsx";
/* fs.readdirSync(__dirname).forEach(file => {
  console.log(file)});  wyświtlanie zawartośi bieżącego katalogu */

router.post("/image", uploadImage.array("imagesFiles", 25), (req, res) => {
  console.log("Plik Dodano");
});

router.post(
  "/uploadFiles",
  upload.single("kolaborant"),
  (req, res) => {
    console.log(req, "zapytanie")
    try {
      if (req.file == null || req.file === "undefined") {
      
        console.log("błąd 400 - plik nie istnieje");
        res.status(400).json("Brak Pilku");
        return;
      } else {
        const newPath = `public/import/importExcelChance/${nameFile}`;
        fs.rename(req.file.path, newPath);
        const excelData = excelToJson({
          sourceFile: newPath,
          header: {
            rows: 1,
          },
          columnKey: {
            "*": "{{columnHeader}}",
          },
        });
        res.status(200).json(excelData);
    
       axios.post("http://scooter.k2webdev.pl/temp/add",excelData)
       console.log("dodano")
      }
    } catch (error) {
      res.status(500);
      console.log("błąd 500");
      return;
    }
  }
);

router.post(
  "/uploadCustomerFiles",
  uploadCustomerFile.single("customerFiles"),
  (req, res) => {
    try {
      if (req.file == null || req.file === "undefined") {
        console.log("Brak załącznika");
        return;
      } else {
        const newPath = `public/import/importCustomerFile/${req.file.originalname}`;
        fs.rename(req.file.path, newPath);
        res.json("file uploaded!");
      }
    } catch (error) {
      res.status(500);
      console.log("błąd 500");
      return;
    }
  }
);

module.exports = router;
