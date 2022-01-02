const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: mongoose.SchemaTypes.Boolean, default: false },
    premium: { type: mongoose.SchemaTypes.Boolean, default: false },
    links: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Link",
        default: [],
      },
    ],
  },
  { timestamps: true }
)

exports.User = mongoose.model("user", userSchema)
