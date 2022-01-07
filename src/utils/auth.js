const { secretKey } = require("../config")
const { sign, verify } = require("jsonwebtoken")
const { User } = require("../resources/user/user.model")
const bcrypt = require("bcrypt")

exports.signIn = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res
      .status(456)
      .json({ error: "You need to provide email and password!" })
  const user = await User.findOne({
    email: req.body.email,
  }).exec()
  console.info(user)
  console.info(user.password)
  if (!user)
    return res.status(443).json({ error: "Incorrect email or password" })
  // this one needs a try/catch block
  if (!(await bcrypt.compare(req.body.password, user.password)))
    return res.status(443).json({ error: "Incorrect email or password" })
  console.log("user", user)
  const token = await sign({ email: req.body.email }, secretKey, {
    expiresIn: "120s",
  })
  console.info("your token is: ", token)
  return res.json({ token: token })
}

exports.protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Bearer token required" })
  }

  const token = bearer.split("Bearer ")[1].trim()
  // console.log("Token:", token)
  let payload
  try {
    payload = await verify(token, secretKey)
  } catch (e) {
    return res.status(401).json({ error: "Incorrect or expired token" })
  }
  // authorization middleware -- ends
  req.payload = payload
  next()
}
// Admin authorization
exports.adminAuth = async (req, res, next) => {
  const payload = req.payload
  // is admin
  if (payload.admin != true) {
    return res
      .status(666)
      .json({ error: "Not authorized: Only admins have access" })
  }
  //
  next()
}

// User authorization
exports.userAuth = async (req, res, next) => {
  let payload = req.payload
  if (!payload.email) {
    return res.status(666).json({ error: "Token doesn't have email info" })
  }
  const theUser = await User.findOne({ email: payload.email }).exec()
  if (theUser == null) {
    return res.status(444).json({ error: "User not found!" })
  }
  //
  req.user = theUser
  next()
}
