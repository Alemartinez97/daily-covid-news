const express = require("express");
const router = express.Router();
const controller = require("../controllers/news.controller");
const middleware = require("../middleware/auth");
router.get("/news", middleware, controller.news);
router.get("/allthenews", middleware, controller.allthenews);

module.exports = router;
