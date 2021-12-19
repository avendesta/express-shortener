const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema(
  {
    longUrl: String,
    shortUrl: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    clicks: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "click",
        default: [],
      },
    ],
  },
  { timestamps: true }
)

exports.Link = mongoose.model("link", linkSchema)
