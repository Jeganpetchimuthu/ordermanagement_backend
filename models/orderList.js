const mongoose = require("mongoose");

const orderListSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethods: {
    type: String,
    required: true,
  },
});

orderList = mongoose.model("orderList", orderListSchema);

module.exports = orderList;
