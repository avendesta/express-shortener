const mongoose = require("mongoose")
const { Link } = require("./link.model")
const { User } = require("../user/user.model")
const { sign, verify } = require("jsonwebtoken")
const validator = require("validator")

// validate request body before creating a new link
exports.validateCreate = async (req, res, next) => {
  if (!req.body.longUrl || !req.body.shortUrl)
    return res
      .status(456)
      .json({ error: "You need to provide 'longUrl' and 'shortUrl'!" })
  if (!validator.isURL(req.body.longUrl))
    return res.status(343).json({ error: "'longUrl' must be a valid URL" })
  if (!validator.isAlphanumeric(req.body.shortUrl))
    return res.status(434).json({ error: "'shortUrl' should be alphanumeric" })
  if (!validator.isLength(req.body.shortUrl, { min: 5 }))
    return res
      .status(434)
      .json({ error: "'shortUrl' should have at least 5 characters" })
  next()
}
// create a link in database from request body
exports.create = async (req, res) => {
  const payload = req.payload
  const user = req.user

  // other stuff
  const data = {
    _id: new mongoose.Types.ObjectId(),
    longUrl: req.body.longUrl,
    shortUrl: req.body.shortUrl,
  }
  const link = await Link.findOne({ shortUrl: req.body.shortUrl }).exec()
  if (link)
    return res
      .status(409)
      .json({ error: "Short Link already exists in database!" })
  data.createdBy = user
  const newLink = await new Link(data)
  await newLink.save()
  await user.update({}, { $addToSet: { links: [newLink] } })
  // await user.links.push(newLink)
  // await user.save()

  const response = await Link.findOne({
    _id: newLink._id,
  }).exec()
  return res.status(201).json(response)
}

// read all links from database
exports.read = async (req, res) => {
  let payload = req.payload
  if (payload.admin == true) {
    const allLinks = await Link.find().exec()
    return res.json(allLinks)
  } else {
    let user = req.user
    const userLinks = await Link.find({ createdBy: user._id }).exec()
    return res.json(userLinks)
  }
}
