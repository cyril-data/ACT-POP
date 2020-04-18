const mongoose = require("mongoose");

const lutteSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  collectif: { type: String },
  forme: { type: String },
  cause: { type: String },
  date: { type: Date },
  lat: { type: Number },
  lng: { type: Number },
  affiche: { data: Buffer, contentType: String },
  popup: { data: Buffer, contentType: String },
  imagePreviewUrl: { data: Buffer, contentType: String }
});

const Lutte = mongoose.model("Lutte", lutteSchema);

module.exports = Lutte;
