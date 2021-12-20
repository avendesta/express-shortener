const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    admin: { type: mongoose.SchemaTypes.Boolean, default: false },
    premium: { type: mongoose.SchemaTypes.Boolean, default: false },
    links: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Link",
        required: false,
        default: [],
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: null,
      required: false,
    },
  },
  { timestamps: true }
)

exports.User = mongoose.model("user", userSchema)
