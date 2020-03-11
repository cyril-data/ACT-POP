const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const Lutte = require("./src/Lutte.model");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
const PORT = 8080;

app.use(bodyParser.json());

app.get("/luttes", async (req, res) => {
  const luttes = await Lutte.find();
  res.json(luttes);
});

/* Trouver une seule lutte avec id */
app.get("/luttes:id", async (req, res) => {
  const lutte = await Lutte.findById(req.params.id);
  res.json(lutte);
});

app.post("/lutte-creation", async (req, res) => {
  console.log("req", req.body);

  const dateClient = new Date(req.body.date);
  console.log("dateClient", dateClient);

  const lutte = new Lutte({
    collectif: req.body.collectif,
    forme: req.body.forme,
    cause: req.body.cause,
    date: dateClient,
    lat: req.body.lat,
    lng: req.body.lng,
    affiche: req.body.affiche,
    popup: req.body.popup
  });

  await lutte.save().then(() => console.log("Lutte creee"));

  res.send("Lutte creee \n");
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
