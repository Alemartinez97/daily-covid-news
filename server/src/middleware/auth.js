const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace(/['"]+/g, "");
    console.log("to",token)
    const decodedToken = jwt.verify(token, "top_secret");
    console.log("decodedToken",decodedToken)
    // const userEmail = decodedToken.user.email;
    // if (!userEmail) {
    //   throw "Invalid user ID";
    // }
    // var payload = jwt.decode(token);
    // console.log("que onda", payload.user);
    // //If the expiration date is earlier than the current one, the token has expired
    // if (payload.user.exp <= moment().unix()) {
    //   console.log("que onda", payload.user);
    //   return res.status(409).send({ message: "Token expirado" });
    // }
  } catch (e) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
