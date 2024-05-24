const express = require("express");

const login = require("../models/admin");

const router = express.Router();

const bcrypt = require("bcrypt");

const generateToken = require("../verifyToken/auth");
const verifyToken = require("../verifyToken/verify");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const user = await login.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new login({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "user create successfully!!!" });
  }
  res.status(400).json({ message: "user already Exist" });
});

//CREATE A NEW TOKEN

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const user = await login.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({ message: "Incorrect password" });
  }
  const token = generateToken(user);

  res.json({ token });
});

//TOKEN VERIFY

router.get("/token", verifyToken, (req, res) => {
  res.json({ message: `welcom,${req.user.email}! This is protected data` });
});

module.exports = router;
