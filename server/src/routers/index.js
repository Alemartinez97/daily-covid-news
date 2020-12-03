const express = require("express");
const router = express.Router();
const moment = require("moment");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res, next) {
  res.send("Succes");
});

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err);
        const error = new Error("new Error");
        return next(error);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = {
          _id: user._id,
          email: user.email,
          iat: moment().unix(),
          exp: moment().add(5, "minutes").unix(),
        };
        const token = jwt.sign(body, "top_secret");
        return res.json({ token });
      });
    } catch (e) {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  })(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "You did it!",
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

module.exports = router;
