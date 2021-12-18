const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
});

exports.Link = mongoose.model("link", linkSchema);
