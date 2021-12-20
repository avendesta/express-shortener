const mongoose = require("mongoose")
const { Link } = require("./link.model")
const { User } = require("../user/user.model")
const jwt = require("jsonwebtoken")

// create a link in database from request body
exports.create = async (req, res) => {
  // signing a payload for dev use
  const accessToken = jwt.sign(
    {
      email: "five@gmail.com",
      password: "oneHasP@assw0rd",
    },
    "ThisIsMySecretToken"
  )
  console.info("secret", accessToken)

  // verifying the user creating a link
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end()
  }

  const token = bearer.split("Bearer ")[1].trim()
  // console.log("Token:", token)
  let payload
  try {
    payload = await jwt.verify(token, "ThisIsMySecretToken")
  } catch (e) {
    return res.status(401).json({ error: "Token not verified" })
  }

  // other stuff
  const data = {
    _id: new mongoose.Types.ObjectId(),
    longUrl: req.body.longUrl,
    shortUrl: req.body.shortUrl,
  }
  const user = await User.findOne({ email: payload.email }).exec()
  if (!user) res.status(666).json({ error: "User not found" })
  else {
    data.createdBy = user
    const newLink = await new Link(data)
    await newLink.save()
    await user.links.push(newLink)
    await user.save()
    // .then(console.log)
    // .catch((e) => console.error(e.message))
    const response = await Link.findOne({
      _id: newLink._id,
    }).exec()
    res.status(201).json(response)
  }
}

// read all links from database
exports.read = async (req, res) => {
  const allLinks = await Link.find({}).exec()
  res.json(allLinks)
}
