const { Link } = require("./link.model");
const mongoose = require("mongoose");
const { User } = require("../user/user.model");

exports.addSample = async (req, res) => {
  const l1 = new Link({
    _id: new mongoose.Types.ObjectId(),
    longUrl:
      "https://github.com/FrontendMasters/api-design-node-v3/blob/master/src/resources/item/item.model.js",
    shortUrl: "QWERTY",
    createdBy: (await User.findOne())._id,
  });

  l1.save()
    .then((r) => console.log(r))
    .catch((e) => console.error("Error ", e));

  res.json(l1);
};

exports.getSample = async (req, res) => {
  const l1 = await Link.findOne({ shortUrl: "ABCDE" });
  res.json(l1);
};
