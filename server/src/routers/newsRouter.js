const express = require("express");
const router = express.Router();
const controller = require("../controllers/news.controller");
router.get("/news", controller.news);
router.get("/allthenews", controller.allthenews);
module.exports = router;
