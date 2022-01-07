const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
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

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

exports.User = mongoose.model("user", userSchema)
