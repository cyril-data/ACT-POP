const Lutte = require("../models/Lutte.model");

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    // .then(() => {
    //   res.status(201).json({
    //     message: "Post saved successfully!"
    //   });
    // })
    .catch(next);
};

exports.createLutte = asyncMiddleware(async (req, res, next) => {
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

exports.getAllLutte = asyncMiddleware(async (req, res, next) => {
  const luttes = await Lutte.find();
  res.json(luttes);
});

exports.getOneLutte = asyncMiddleware(async (req, res, next) => {
  const lutte = await Lutte.findById(req.params.id);
  res.json(lutte);
});
