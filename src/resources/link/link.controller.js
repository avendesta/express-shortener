const mongoose = require("mongoose")
const { Link } = require("./link.model")
const { User } = require("../user/user.model")

// adding a sample link to database
exports.addSample = async (req, res) => {
  const l1 = new Link({
    _id: new mongoose.Types.ObjectId(),
    longUrl:
      "https://github.com/FrontendMasters/api-design-node-v3/blob/master/src/resources/item/item.model.js",
    shortUrl: "QWERTY",
    createdBy: (await User.findOne())._id,
  })

  l1.save()
    .then((r) => console.log(r))
    .catch((e) => console.error("Error ", e.message))

  Link.findOne()
    .populate("createdBy")
    .exec((err, link) => {
      console.log("Link shortened: ", link.shortUrl)
      console.log("Link creator", link.createdBy)
      // console.log(err.message);
    })
  res.json(l1)
}

// fetch sample link from database
exports.getSample = async (req, res) => {
  const l1 = await Link.findOne({ shortUrl: "ABCDE" })
  res.json(l1)
}
