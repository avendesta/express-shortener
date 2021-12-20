const mongoose = require("mongoose")
const { Link } = require("./link.model")
const { User } = require("../user/user.model")

// adding a sample link to database
// exports.addSample = async (req, res) => {
//   const l1 = new Link({
//     _id: new mongoose.Types.ObjectId(),
//     longUrl:
//       "https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai",
//     shortUrl: "A3B0DF",
//     createdBy: (await User.findOne())._id,
//     click: [],
//   })

//   l1.save()
//     .then((r) => console.log(r))
//     .catch((e) => console.error("Error ", e.message))

//   Link.findOne()
//     .populate("createdBy")
//     .exec((err, link) => {
//       console.log("Link shortened: ", link.shortUrl)
//       console.log("Link creator", link.createdBy)
//       // console.log(err.message);
//     })
//   res.json(l1)
// }

// // fetch sample link from database
// exports.getSample = async (req, res) => {
//   const l1 = await Link.findOne({ shortUrl: "ABCDE" })
//   res.json(l1)
// }

// create a link in database from request body
exports.create = async (req, res) => {
  const data = {
    _id: new mongoose.Types.ObjectId(),
    longUrl: req.body.longUrl,
    shortUrl: req.body.shortUrl,
  }
  const user = await User.findOne().exec()
  if (!user) res.status(666).json({ error: "User not found" })
  else {
    data.createdBy = user
    const newLink = await new Link(data)
    await newLink.save()
    await user.links.push(newLink)
    await user.save()
    // .then(console.log)
    // .catch((e) => console.error(e.message))
    const link = await Link.findOne().exec()
    res.status(201).json(link)
  }
}

// read all links from database
exports.read = async (req, res) => {
  const allLinks = await Link.find({}).exec()
  res.json(allLinks)
}
