const mongoose = require("mongoose")
const { Click } = require("./click.model")
const { Link } = require("../link/link.model")

// adding a sample click to database
exports.addSample = async (req, res) => {
  const c1 = new Click({
    _id: new mongoose.Types.ObjectId(),
    datetime: "1/2/2021:14:05:23",
    address: "124.646.875",
    link: (await Link.findOne())._id,
  })

  c1.save()
    .then((r) => console.log(r))
    .catch((e) => console.error("Error ", e.message))

  Click.findOne()
    .populate("link")
    .exec((err, click) => {
      console.log("click ip address: ", click.address)
      console.log("associated link", click.link)
      // console.log(err.message)
    })
  res.json(c1)
}

// fetch sample click from database
exports.getSample = async (req, res) => {
  const c1 = await Click.findOne()
  res.json(c1)
}
