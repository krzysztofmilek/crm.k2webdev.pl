const mongoose = require("mongoose");

let Token;

try {
  Token = mongoose.model("Token");
} catch (e) {
  const TokenModel = new mongoose.Schema(
    {
      user_id: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  Token = mongoose.model("Token", TokenModel);
}

module.exports = Token;