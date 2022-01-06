const mongoose = require("mongoose")
const { User } = require("./user.model")
const { Link } = require("./../link/link.model")
const { sign, verify } = require("jsonwebtoken")
const { secretKey } = require("../../config")
const validator = require("validator")

// validate request body before creating a new link
exports.validateCreate = async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return res
      .status(456)
      .json({ error: "You need to provide email and password!" })
  if (!validator.isStrongPassword(req.body.password))
    return res.status(343).json({ error: "weak 'password'" })

  next()
}
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
  if (user)
    return res.status(409).json({ error: "User already exists in database!" })
  await newUser.save()
  const response = await User.findOne({ _id: newUser._id }).exec()
  return res.status(201).json(response)
}

// read all users from database
exports.read = async (req, res) => {
  const allUsers = await User.find({}).exec()
  res.json(allUsers)
}
