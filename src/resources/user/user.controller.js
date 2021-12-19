const mongoose = require("mongoose")
const { User } = require("./user.model")
const { Link } = require("./../link/link.model")

// create a user in database from request body
exports.create = async (req, res) => {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
    premium: req.body.premium,
  })
  const user = await User.findOne({ email: req.body.email }).exec()
  if (user) res.status(409).json({ error: "User already exists in database!" })
  else {
    newUser.save()
    // .then(console.log)
    // .catch((e) => console.error(e.message))
    res.status(201).json(newUser)
  }
}

// read all users from database using request parameter
exports.read = async (req, res) => {
  const allUsers = await User.find({}).exec()
  res.json(allUsers)
}
