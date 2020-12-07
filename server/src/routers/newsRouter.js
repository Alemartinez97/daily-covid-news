const express = require("express");
const router = express.Router();
const controller = require("../controllers/news.controller");
const middleware = require("../middleware/auth");
/**
 * @swagger
 * /news:
 *    get:
 *      description: service to search news by filter
 */
router.get("/news", middleware, controller.news);
router.get("/newsRn", middleware, controller.newsRn);
router.get("/allthenews", middleware, controller.allthenews);

module.exports = router;
