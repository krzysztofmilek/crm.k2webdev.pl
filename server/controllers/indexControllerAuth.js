const express = require("express");
require("dotenv").config();
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendEmail");
const Token = require("../models/TokenModel");
const sendEmail = require("../utils/sendEmail");
const { createPublicKey } = require("crypto");

const refreshTokens = [];

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(200)
        .send({ success: false, message: "Użytkownik istnieje" });
    const newuser = new User(req.body);
    const result = await newuser.save();
    await sendMail(result, "verify");
    res.status(200).send({
      success: true,
      message: "Sukces. Aby dokończyć rejestrację odbierz pocztę",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (user) {
        const passwordsMached = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordsMached) {
        if (user.isVerifed) {
          const dataToFrontEnd = {
            _id: user._id,
            email: user.email,
            name: user.name,
            access: user.admin,
          };
          const token = jwt.sign(dataToFrontEnd, "jebacPis");

          res.status(200).send({
            success: true,
            _id: user.id,
            access: user.admin,
            name: user.name,
            message: "Zalogowano",
            jwt_token: token,
          });
        } else {
          res

            .status(200)
            .send({ success: false, message: "Niezweryfikowany adres e-mail" });
        }
      } else
        res
          .status(200)
          .send({ success: false, message: "Nieprawidłowe dane logowania" });
    } else {
      console.error(error);
      res.status(200).send({
        success: false,
        message: "Nieprawidłowe dane logowania",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Jakiś błąd" });
  }
});

router.post("/send-reset-password-link/", async (req, res) => {
  try {
    const result = User.findOne({ _id: req.body.user_id });
    await sendEmail(result, "resetpassword");
  } catch (error) {
    res.send(500).send(error);
  }
});

router.post("/verify/", async (req, res) => {
  try {
    const tokenData = await Token.findOne({ token: req.body.token });
    console.log(tokenData);
    if (tokenData) {
      await User.findOneAndUpdate(
        { _id: tokenData.user_id },
        { isVerifed: true }
      );
      await Token.findOneAndDelete({ token: req.body.token });
      res.send({ success: true, message: "Email zweryfikowany poprawnie" });
    } else {
      res.send({
        success: false,
        message: "Weryfikacja przebiegła niepomyslnie",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/resetpassword/", async (req, res) => {
  try {
    const tokenData = await Token.findOne({ token: req.body.token });

    if (tokenData) {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate(
        { _id: tokenData.user_id },
        { password: hashedPassword }
      );
      await Token.findOneAndDelete({ token: req.body.token });
      res.send({ success: true, message: "Hasło zmienione pomyślnie" });
    } else {
      res.send({
        success: false,
        message: "Zmiana hasło nie udała się",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/sendpasswordresetlink/", async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email });
    await sendEmail(result, "resetpassword");
    res.send({
      success: true,
      message: "Link do zmiany hasła został wysłany na podany email",
    });
  } catch (error) {
    console.error(error.message);
  }
});


router.post("/sendOffer/", async (req, res) => {
  console.log("wysłano")

  try {
const  results = req.body;
    await sendEmail(results, "sendOffer");
    res.send({
      success: true,
      message: "Wysłoano ofertę",
    });
  } catch (error) {
    console.error(error.message);
  } 
});

router.post("/plain/", async (req, res) => {
  await Plain.find(req.query)
    .lean()
    .exec((err, allPlain) => {
      if (err) {
        res.send("Błąd pobrania danych");
      }
      res.json(allPlain);
    });
});

module.exports = router;
