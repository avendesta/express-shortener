const mongoose = require("mongoose")

const clickSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
    operatingSystem: { type: String, default: null },
    referer: { type: String, default: null },
    link: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "link",
      required: true,
    },
  },
  { timestamps: true }
)

exports.Click = mongoose.model("click", clickSchema)
