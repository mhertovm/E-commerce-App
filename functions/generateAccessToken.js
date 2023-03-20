
const SECRET = "123333";
const jwt = require("jsonwebtoken");

function generateAccessToken (username, role) {
    jwt.sign({ username, role}, SECRET, { expiresIn: "36000s" });
}

 module.exports = { generateAccessToken };