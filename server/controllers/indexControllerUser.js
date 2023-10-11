
const User = require("../models/UserModel");


module.exports = {
  allUsers: (req, res) => {
    User.find(req.query)
      .lean()
      .exec((err, allUser) => {
        if (err) {
          res.send("Błąd pobrania użykowników");
        }
        res.json(allUser);
      });
  },

  findData: (req, res) => {
    User.findById(req.params.id, req.body)
      .lean()
      .exec((err, findData) => {
        if (err) {
          res.send("Błąd wyszukania");
        }
        res.json(findData);
      });
  },

  logout: (req, res) => {
    req = req.generateAuthToken(null);
    res.send("Wylogowano");
  },

  create: (req, res) => {
  
    let newUser = new User(req.body);
    newUser.save((err) => {
      if (err) {
        res.send("Błąd dodawania użytkownika");
      } else {
        res.json(newUser);
        console.log("dodano")
      }
    });
  },

  delete: (req, res) => {
    User.findByIdAndDelete(req.params.id).exec((err) => {
      if (err) {
        res.send("Błąd usuwania uzytkownika");
      }
      res.json({ deleted: true });
    });
  },

  changePassword: (req, res) => {
    User.findById(req.params.id).exec((err, updatePassword) => {
      updatePassword.password = req.body.password;
      updatePassword.save((err) => {
        if (err) {
          res.send("Błąd aktualizacji");
        }
        res.send({ update: true });
      });
    });
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).exec((err, updateUser) => {
      if (err) {
        res.send("Błąd aktualizacji");
      }
      res.json(updateUser);
    });
  },
};
