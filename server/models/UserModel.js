const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");

const UserModel = new mongoose.Schema({
  active: { type: Boolean, require: true },
  admin: { type: Boolean, require: true },
  name: {
    type: String,
    require: true,
  },
  phone: { type: String, require: true },
  position: { type: String, require: true },
  email: { type: String, require: true, unique: true, trim: true },
  password: {
    type: String,
    require: true,
  },
  isVerifed: {
    type: Boolean,
    default: false,
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    }],
    action: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
      },
  ],
  imageUser: {
    type: String,
 
  },
});

 UserModel.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
  });
});  


UserModel.methods.generateAuthToken = (user) =>{
 const token = jwt.sign({ _id: user._id }, 'secret',{expiresIn: '600'});
 return token;

}

module.exports = mongoose.model("User", UserModel);
