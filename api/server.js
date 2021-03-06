const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const actPopRoutes = require("./routes/actPop");
const userRoutes = require("./routes/user");

app.use(cors());
const PORT = 8080;

app.use(bodyParser.json());

app.use("/api/actPop", actPopRoutes);
app.use("/api/auth", userRoutes);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
