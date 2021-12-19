const mongoose = require("mongoose")
const { Link } = require("./link.model")
const { User } = require("../user/user.model")

// adding a sample link to database
exports.addSample = async (req, res) => {
  const l1 = new Link({
    _id: new mongoose.Types.ObjectId(),
    longUrl:
      "https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai",
    shortUrl: "A3B0DF",
    createdBy: (await User.findOne())._id,
    click: [],
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
