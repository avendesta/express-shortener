const mongoose = require("mongoose")

const clickSchema = new mongoose.Schema({
  datetime: String,
  address: String,
  link: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "link",
    required: true,
  },
})

exports.Click = mongoose.model("click", clickSchema)
