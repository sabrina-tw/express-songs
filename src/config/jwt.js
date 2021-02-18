var jwt = require("jsonwebtoken");
const getJWTSecret = require("./getJWTSecret");

const createJWTToken = (username) => {
  const secret = getJWTSecret();

  const token = jwt.sign({ username }, secret, { expiresIn: "1d" });
  return token;
};

module.exports = createJWTToken;
