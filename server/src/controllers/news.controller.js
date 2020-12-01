const express = require("express");
const axios = require("axios");
var moment = require("moment");
const { News } = require("../models/News");
const apiKey = "9049dd7d1d324e55a8488e3b545aba7f";
let dates = [0];
let variant1 = [0];
let variant2 = [0];
let timeCall;
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
      res.status(201).send(dates);
    }
    const body = await axios.get(
      `https://api.jornalia.net/api/v1/articles?apiKey=${apiKey}&providers=${providers}&search=${search}&categories=${categories}&startDate=${startDate}&endDate=${endDate}`
    );
    // timeCall = body.headers.date;
    for (let s = 0; s < body.data.articles.length; s++) {
      const {
        _id,
        category,
        title,
        description,
        publishedAt,
        imageUrl,
        sourceUrl,
      } = body.data.articles[s];

      const news = new News({
        provider: body.data.articles[s].provider.name,
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
    await handleFind(
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
exports.allthenews = async (req, res) => {
  try {
    const { search, providers, categories, startDate, endDate } = req.query;
    await handleDeleteWithMoreThanFiveDays();
    const body = await axios.get(
      `https://api.jornalia.net/api/v1/articles?apiKey=${apiKey}&providers=${providers}&search=${search}&categories=${categories}&startDate=${startDate}&endDate=${endDate}`
    );
    for (let s = 0; s < body.data.articles.length; s++) {
      const {
        _id,
        category,
        title,
        description,
        publishedAt,
        imageUrl,
        sourceUrl,
      } = body.data.articles[s];

      const news = new News({
        provider: body.data.articles[s].provider.name,
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

    const all = await News.find({ title: { $regex: "coronavirus" } });

    res.status(200).send(all);
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
  }
};
