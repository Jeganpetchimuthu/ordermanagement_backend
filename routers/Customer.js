const express = require("express");
const mongoose = require("mongoose");

const Customer = require("../models/customer");

const router = express.Router();

router.post("/customer", async (req, res) => {
  console.log(req.body);
  try {
    const { customerName, email, address, mobileNumber, status } = req.body;

    const newCustomer = new Customer({
      customerName,
      email,
      address,
      mobileNumber,
      status,
    });

    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch {
    res.status(400).json("error on message");
  }
});

router.get("/customer", async (req, res) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/customer/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const { customerName, email, address, mobileNumber, status } = req.body;
    await Customer.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        customerName,
        email,
        address,
        mobileNumber,
        status,
      }
    );
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/customer/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    await Customer.findOneAndDelete({
      _id: _id,
    });
    res.status(201).json({ _id: _id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
