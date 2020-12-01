const mongoose = require("mongoose");

const ActPop = require("../models/ActPop.model");

const network = process.env.NODE_ENV === "development" ? "localhost" : "mongo";

const connection = `mongodb://${network}:27017/mongo-test`;

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
