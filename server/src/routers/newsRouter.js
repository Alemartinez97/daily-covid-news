const express = require("express");
const router = express.Router();
const app = express();
const controller = require("../controllers/news.controller");
router.get("/news", controller.news);
module.exports = router;
