const express = require("express");
const router = express.Router();
const request = require("request");
var moment = require("moment");
const { News } = require("../models/News");
const { search } = require("../routers/newsRouter");
const apiKey = "d0fffad6e4e04742afe9495b395b67b7";
let dates = [0];
let variant1 = [0];
let variant2 = [0];
//when the news is more than 5 days old it will be deleted
const handleDeleteWithMoreThanFiveDays = async () => {
  variant1 = await News.find({
    publishedAt: {
      $lt: moment().subtract(5, "days").format(),
    },
  });
  if (variant1.length > 1) {
    for (let i in variant1) {
      await News.deleteOne({ _id: variant1[i]._id });
    }
  }
};

//remove repeated news
const handleRemoveRepeats = async (title) => {
  variant2 = await News.find({
    title: title,
  });
  if (variant2.length > 1) {
    await News.deleteOne({ title: variant2[0].title });
  }
};

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
    console.log("callback",req.query)
    await handleDeleteWithMoreThanFiveDays();

    await handleFind(
      search,
      searchindataclass,
      startDate,
      endDate,
      order,
      pagination
    );
    if (dates.length > 1) {
      console.log("resultado",dates)
      return res.status(200).send(dates);
    }
    await request(
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
            await handleRemoveRepeats(title);
          }
        }
      }
    );
    await handleFind(
      search,
      searchindataclass,
      startDate,
      endDate,
      order,
      pagination
    );
    console.log("resultado",dates)
    res.status(200).send(dates);
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
  }
};
exports.allthenews = async (req, res) => {
  try {
    const { search, providers, categories, startDate, endDate } = req.query;
    await handleDeleteWithMoreThanFiveDays();
    await request(
      `https://api.jornalia.net/api/v1/articles?apiKey=${apiKey}&providers=${providers}&search=${search}&categories=${categories}&startDate=${startDate}&endDate=${endDate}`,
      async (err, response, body) => {
        if (!err) {
          var variant = JSON.parse(body);
          for (let s = 0; s < variant.articles.length; s++) {
            const {
              _id,
              category,
              title,
              description,
              publishedAt,
              imageUrl,
              sourceUrl,
            } = variant.articles[s];

            const news = new News({
              idNews: _id,
              provider: variant.articles[s].provider.name,
              category: category,
              title: title,
              description: description,
              publishedAt: moment(publishedAt).format(),
              imageUrl: imageUrl,
              sourceUrl: sourceUrl,
            });
            await news.save();
            await handleRemoveRepeats(title);
          }
        }
      }
    );
    // await News.deleteMany();
    const all = await News.find();
    res.status(200).send(all);
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
  }
};
