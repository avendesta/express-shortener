const mongoose = require("mongoose")
const { User } = require("./user.model")
const { Link } = require("./../link/link.model")

// add sample user to database
exports.addSample = async (req, res) => {
  const p1 = new User({
    _id: new mongoose.Types.ObjectId(),
    email: "tam@rat.miu",
    password: "tam rat",
    links: [(await Link.findOne())._id],
  })
  const p2 = new User({
    _id: new mongoose.Types.ObjectId(),
    email: "samuel@miu.edu",
    password: "SamuelPassword1@",
  })

  p1.save()
    .then((r) => console.log(r))
    .catch((e) => console.error("Error ", e.message))
  p2.save()
    .then((r) => console.log(r))
    .catch((e) => console.error("Error ", e.message))
  res.json(p2)
}

// fetch sample user from database
exports.getSample = async (req, res) => {
  const u1 = await User.findOne()
  res.json(u1)
}
