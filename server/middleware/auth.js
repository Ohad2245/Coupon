const jwt =  require("jsonwebtoken");
const config = require("../config/config.js")

const messages =  require("../config/messages.js");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    let decodedData = jwt.verify(token, config.AUTH_TOKEN);
    req.userId = decodedData.id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(401).json({ details: error.message });
    res.status(500).json({ details: messages.token_missing });
  }
};

module.exports = auth;
