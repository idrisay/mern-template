const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require('./models/product')

const apiDomain =
  process.env.VERCEL_URL !== undefined
    ? process.env.VERCEL_URL
    : `http://localhost:3001`;
const websiteDomain =
  process.env.VERCEL_URL !== undefined
    ? process.env.VERCEL_URL
    : `http://localhost:3000`;

const app = express();

// Connect to MongoDB
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@testcluster1.dgy2p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB :    Connected to MongoDB Successfully!");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

const database = mongoose.connection;

app.get("/api", async (req, res) => {
  Product.find()
  .then((result) => {
      res.send({
        message: 'Success',
        result
      })
  })
  .catch((err) => {
      console.log(err)
  })
});

app.use((err, req, res, next) => {
  res.status(500).send("Internal error: " + err.message);
});

app.listen(3001, () => console.log(`API Server listening on port 3001`));

module.exports = app;
