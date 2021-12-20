const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
)

exports.Admin = mongoose.model("admin", adminSchema)
