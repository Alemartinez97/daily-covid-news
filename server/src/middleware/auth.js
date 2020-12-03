const jwt = require("jsonwebtoken");
const moment = require("moment");
module.exports = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.replace(/['"]+/g, "");
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, "top_secret");
    const userEmail = decodedToken.email;
    if (!userEmail) {
      throw "Invalid user ID";
    }
    //If the expiration date is earlier than the current one, the token has expired
    if (decodedToken.exp <= moment().unix()) {
      return res.status(401).send({ message: "Expired token" });
    }
    next();
  } catch (e) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

