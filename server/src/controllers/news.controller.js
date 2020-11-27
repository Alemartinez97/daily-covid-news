const express = require("express");
const router = express.Router();
const request = require("request");
var moment = require("moment");
const { News } = require("../models/News");
let dates = [0];
//will search the news in the database by title, source and date ranges
const handleFind = async (
  search,
  searchindataclass,
  startDate,
  endDate,
  order,
  pagination
) => {
  dates = await News.find({
    title: { $regex: search },
    provider: { $regex: searchindataclass },
    publishedAt: {
      $gte: moment(startDate).format(),
      $lt: moment(endDate).format(),
    },
  })
    .sort({ publishedAt: parseInt(order) }) //pagination and order
    .limit(parseInt(pagination));
  return dates;
};
exports.news = async (req, res) => {
  try {
    const {
      search,
      providers,
      categories,
      startDate,
      endDate,
      pagination,
      order,
      searchindataclass,
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

    const apiKey = "d0fffad6e4e04742afe9495b395b67b7";

    handleFind(
      search,
      searchindataclass,
      startDate,
      endDate,
      order,
      pagination
    );
    if (dates.length > 1) {
      return res.status(201).send(dates);
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
    handleFind(
      search,
      searchindataclass,
      startDate,
      endDate,
      order,
      pagination
    );
    res.status(200).send(dates);
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
  }
};
