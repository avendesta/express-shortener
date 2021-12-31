const { secretKey } = require("../config")
// Admin authorization
exports.adminAuth = async (req, res, next) => {
  // authorization middleware -- begins
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end()
  }

  const token = bearer.split("Bearer ")[1].trim()
  // console.log("Token:", token)
  let payload
  try {
    payload = await verify(token, secretKey)
  } catch (e) {
    return res.status(401).json({ error: "Token not verified" })
  }
  // authorization middleware -- ends
  // is admin
  if (payload.admin != true) {
    return res
      .status(666)
      .json({ error: "Not authorized: Only admins can read all users" })
  }
  //
  next()
}

// User authorization
exports.userAuth = async (req, res, next) => {
  // authorization middleware -- begins
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end()
  }

  const token = bearer.split("Bearer ")[1].trim()
  // console.log("Token:", token)
  let payload
  try {
    payload = await verify(token, secretKey)
  } catch (e) {
    return res.status(401).json({ error: "Token not verified" })
  }
  // authorization middleware -- ends
  // user exists
  if (!payload.email) {
    return res.status(666).json({ error: "Token doesn't have email info" })
  }
  const theUser = await User.findOne({ email: payload.email }).exec()
  if (!theUser) res.status(666).json({ error: "User not found!" })
  //
  req.user = theUser
  next()
}
