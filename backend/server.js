import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';

dotenv.config();

const mongodbUrl = config.MONBGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParse: true
}).catch(error => console.log(error.message));

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({msg: "product not found."})
  }
});

app.listen(5000, () => {console.log('Server is running on http://localhost:5000')});