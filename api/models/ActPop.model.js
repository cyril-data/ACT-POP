const mongoose = require("mongoose");

const actPopSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  collectif: { type: String },
  forme: { type: String },
  nom: { type: String },
  date: { type: Date },
  lat: { type: Number },
  lng: { type: Number },
  affiche: { data: Buffer, contentType: String },
  popup: { data: Buffer, contentType: String },
  imagePreviewUrl: { data: Buffer, contentType: String },
});

const ActPop = mongoose.model("ActPop", actPopSchema);

module.exports = ActPop;
