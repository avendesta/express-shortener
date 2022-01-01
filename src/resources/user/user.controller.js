const mongoose = require("mongoose")
const { User } = require("./user.model")
const { Link } = require("./../link/link.model")
const { sign, verify } = require("jsonwebtoken")
const { secretKey } = require("../../config")

// create a user in database from request body
exports.create = async (req, res) => {
  const data = {
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
    premium: req.body.premium,
  }
  const newUser = await new User(data)
  const user = await User.findOne({ email: req.body.email }).exec()
  if (user) res.status(409).json({ error: "User already exists in database!" })
  else {
    await newUser.save()
    // .then(console.log)
    // .catch((e) => console.error(e.message))
    const response = await User.findOne({ _id: newUser._id }).exec()
    res.status(201).json(response)
  }
}

// read all users from database
exports.read = async (req, res) => {
  const allUsers = await User.find({}).exec()
  res.json(allUsers)
}
