const ActPop = require("../models/ActPop.model");

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    // .then(() => {
    //   res.status(201).json({
    //     message: "Post saved successfully!"
    //   });
    // })
    .catch(next);
};

exports.createActPop = asyncMiddleware(async (req, res, next) => {
  console.log("req", req.body);

  const dateClient = new Date(req.body.date);
  console.log("dateClient", dateClient);

  const actPop = new ActPop({
    collectif: req.body.collectif,
    forme: req.body.forme,
    nom: req.body.nom,
    date: dateClient,
    lat: req.body.lat,
    lng: req.body.lng,
    affiche: req.body.affiche,
    popup: req.body.popup,
  });

  await actPop.save().then(() => console.log("ActPop creee"));

  res.send("ActPop creee \n");
});

exports.getAllActPop = asyncMiddleware(async (req, res, next) => {
  const actPops = await ActPop.find();
  res.json(actPops);
});

exports.getOneActPop = asyncMiddleware(async (req, res, next) => {
  const actPop = await ActPop.findById(req.params.id);
  res.json(actPop);
});
