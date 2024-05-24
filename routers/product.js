const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/product");

const router = express.Router();

router.post("/product", async (req, res) => {
  console.log(req.body);
  try {
    const { product, brand, category, price, stock } = req.body;

    const newProduct = new Product({
      product,
      brand,
      category,
      price,
      stock,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch {
    res.status(400).json("error on message");
  }
});

router.get("/product", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/product/:id", (req, res) => {
  try {
    const getProduct = Product.findById(req.params.id);
    console.log(getProduct);
    res.status(200).json(getProduct);
  } catch (error) {
    console.log(error);
  }
});

// router.put("/product/:id", async (req, res) => {
//   const _id = req.params._id;
//   try {
//     await Product.findOneAndUpdate(
//       {
//         _id: req.params._id,
//       },
//       {
//         product: req.body.product,
//         brand: req.body.brand,
//         category: req.body.category,
//         price: req.body.price,
//         stock: req.body.stock,
//       }
//     );
//     res.status(201).json({ _id: _id });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        product: req.body.product,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/product/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Product.findOneAndDelete({
      _id: _id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
