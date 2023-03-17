const jwt = require("jsonwebtoken");

let SECRET = "secrettoken"
function generateAccessToken(username, role) {
  return jwt.sign({ username, role }, SECRET, { expiresIn: "36000s" });
}

module.exports = { generateAccessToken }
