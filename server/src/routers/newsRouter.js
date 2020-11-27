const express = require("express");
const router = express.Router();
const request = require("request");
var moment = require("moment");
const { News } = require("../models/News");
let dates = [0];
//will search the news in the database by title, source and date ranges
const handleFind = async (
  search,
  providers,
  startDate,
  endDate,
  order,
  pagination
) => {
  dates = await News.find({
    title: { $regex: search },
    provider: { $regex: providers },
    publishedAt: {
      $gte: moment(startDate).format(),
      $lt: moment(endDate).format(),
    },
  })
    .sort({ publishedAt: parseInt(order) }) //pagination and order
    .limit(parseInt(pagination));
  return dates;
};
router.get("/news", async (req, res) => {
  try {
    const {
      search,
      providers,
      categories,
      startDate,
      endDate,
      pagination,
      order,
    } = req.query;
    
    const variant1 = await News.find({
      publishedAt: {
        $lt: moment(endDate).subtract(5, "days").format(),
      },
    });
//when the news is more than 5 days old it will be deleted
    for (let i in variant1) {
      await News.deleteOne({ _id: variant1[i]._id });
    }

    const apiKey = "70165fcfa7334ae59c3405314c6c6cde";
    handleFind(search, providers, startDate, endDate, order, pagination);
    if (dates.length > 1) {
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
              publishedAt: moment(publishedAt).format(),
              imageUrl: imageUrl,
              sourceUrl: sourceUrl,
            });
            await news.save();
          }
        }
      }
    );
    handleFind(search, providers, startDate, endDate, order, pagination);
    res.status(200).send(dates);
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
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
