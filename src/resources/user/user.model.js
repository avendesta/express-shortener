const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  links: [
    { type: mongoose.SchemaTypes.ObjectId, ref: "Link", required: false },
  ],
});

exports.User = mongoose.model("user", userSchema);
