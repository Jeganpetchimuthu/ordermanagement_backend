const jwt = require("jsonwebtoken");

const generateToken = (user) =>
  jwt.sign({ id: user.id }, process.env.SECRET_KEY);

module.exports = generateToken;
