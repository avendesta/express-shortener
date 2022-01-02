const mongoose = require("mongoose")
const { Link } = require("./link.model")
const { User } = require("../user/user.model")
const { sign, verify } = require("jsonwebtoken")

// create a link in database from request body
exports.create = async (req, res) => {
  let payload = req.payload

  // other stuff
  const data = {
    _id: new mongoose.Types.ObjectId(),
    longUrl: req.body.longUrl,
    shortUrl: req.body.shortUrl,
  }
  const user = await User.findOne({ email: payload.email }).exec()
  if (!user) return res.status(666).json({ error: "User not found" })
  else {
    data.createdBy = user
    const newLink = await new Link(data)
    await newLink.save()
    await user.links.push(newLink)
    await user.save()

    const response = await Link.findOne({
      _id: newLink._id,
    }).exec()
    return res.status(201).json(response)
  }
}

// read all links from database
exports.read = async (req, res) => {
  let payload = req.payload
  let user = req.user
  if (user.admin) {
    const allLinks = await Link.find().exec()
    return res.json(allLinks)
  } else {
    const userLinks = await Link.find({ createdBy: user._id }).exec()
    return res.json(userLinks)
  }
}
