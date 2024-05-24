const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true, //const{product,brand,category ,price,stock }= req.body
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
});

stockList = mongoose.model("stockList", stockSchema);

module.exports = stockList;
