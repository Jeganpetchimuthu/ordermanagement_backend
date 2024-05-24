const express = require("express");
const mongoose = require("mongoose");

const Stock = require("../models/stockItem");

const router = express.Router();

router.post("/stockItem", async (req, res) => {
  console.log(req.body);
  try {
    const { product, brand, category, price, stock } = req.body;

    const newStock = new Stock({
      product,
      brand,
      category,
      price,
      stock,
    });

    await newStock.save();

    res.status(201).json(newStock);
  } catch {
    res.status(400).json("error on message");
  }
});

router.get("/stockItem", async (req, res) => {
  try {
    const customer = await Stock.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/stockItem/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const { product, brand, category, price, stock } = req.body;
    await Stock.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        product: req.body.product,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
      }
    );
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/stockItem/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Stock.findOneAndDelete({
      _id: _id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
