const express = require("express");
const router = express.Router();
const request = require("request");
var moment = require("moment");
const { News } = require("../models/News");
router.get("/news", async (req, res) => {
  try {
    const { search, providers, categories, startDate, endDate,pagination,order } = req.query;
    const apiKey = "5b2c9d09e2d8465b8fa56f818bfb582f";
    //if the title matches it does not hit the external api
    const dates = await News.find({
      title: search,
      publishedAt: {
        $gte: moment(startDate).format(),
        $lt: moment(endDate).format(),
      },
    });
    if (dates.length > 0) {
      return res.status(200).send(dates);
    }
    request(
      `https://api.jornalia.net/api/v1/articles?apiKey=${apiKey}&providers=${providers}&search=${search}&categories=${categories}&startDate=${startDate}&endDate=${endDate}`,
      async (err, response, body) => {
        if (!err) {
          var variant = JSON.parse(body);
          for (let s = 0; s < variant.articles.length; s++) {
            const {
              category,
              title,
              description,
              publishedAt,
              imageUrl,
              sourceUrl,
            } = variant.articles[s];

            const news = new News({
              provider: variant.articles[s].provider.name,
              category: category,
              title: title,
              description: description,
              publishedAt: publishedAt,
              imageUrl: imageUrl,
              sourceUrl: sourceUrl,
            });
            await news.save();
          }
        }
      }
    );
    //search the database by title, source, date, pagination and order
    const newsCovid = await News.find({
      title:{$regex:search},
      provider: providers,
      publishedAt: {
        $gte: moment(startDate).format(),
        $lt: moment(endDate).format(),
      },
    }).sort( { publishedAt : parseInt(order) } ).limit(parseInt(pagination));
    res.status(200).send(newsCovid);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error desconcido, Contactarse con soporte" });
  }
});
router.delete("/api/task", async (req, res) => {
  try {
    const id = req.params.id;
    let task = await News.deleteMany();

    if (!task) {
      res.status(404).send({ mensaje: "La tarea con id = ${id}" });
      return;
    }
    res.status(200).send(task);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});
module.exports = router;
