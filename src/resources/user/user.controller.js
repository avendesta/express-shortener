const { User } = require("./user.model");
const mongoose = require("mongoose");

exports.addSample = (req, res) => {
  const p1 = new User({
    _id: new mongoose.Types.ObjectId(),
    email: "john@mail.com",
    password: "Winter Jacket",
  });

  p1.save()
    .then((r) => console.log(r))
    .catch((e) => console.error("Error ", e));

  res.json(p1);
};

exports.getSample = async (req, res) => {
  const u1 = await User.findById("61be1a3a38280754f0d639cd");
  res.json(u1);
};
