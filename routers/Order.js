const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/orderList");

const router = express.Router();

router.post("/order", async (req, res) => {
  console.log(req.body);
  try {
    const { product, customer, date, amount, address, paymentMethods } =
      req.body;

    const newOrder = new Order({
      product,
      customer,
      date,
      amount,
      address,
      paymentMethods,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch {
    res.status(400).json("error on message");
  }
});

router.get("/order", async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/order/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const { product, customer, date, amount, address, paymentMethods } =
      req.body;
    await Order.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        product,
        customer,
        date,
        amount,
        address,
        paymentMethods,
      }
    );
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/order/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Order.findOneAndDelete({
      _id: _id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
