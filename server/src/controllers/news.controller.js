const express = require("express");
const axios = require("axios");
var moment = require("moment");
require("dotenv").config();
const { News } = require("../models/News");
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
  limit,
  page
) => {
  dates = await News.find({
    title: { $regex: search },
    // provider: { $regex: searchindataclass },
    publishedAt: {
      $gte: moment(startDate).format(),
      $lt: moment(endDate).format(),
    },
  })
    .sort({ publishedAt: parseInt(order) }) //pagination and order
    .limit(parseInt(limit) * 1)
    .skip((page - 1) * limit)
    .exec();
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
      limit,
      order,
      searchindataclass,
      page,
    } = req.query;
    await handleDeleteWithMoreThanFiveDays();

    await handleFind(
      search,
      searchindataclass,
      startDate,
      endDate,
      order,
      limit,
      page
    );
    const count = await News.countDocuments();
    if (dates.length > 1) {
      res.status(200).send({
        dates,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    }
    const body = await axios.get(
      `https://api.jornalia.net/api/v1/articles?apiKey=${process.env.API_KEY}&providers=${providers}&search=${search}&category=${categories}&startDate=${startDate}&endDate=${endDate}`
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
      limit,
      page
    );
    res.status(200).send({
      dates,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
  }
};
exports.allthenews = async (req, res) => {
  try {
    const { search, categories } = req.query;
    await handleDeleteWithMoreThanFiveDays();
    const body = await axios.get(
      `https://api.jornalia.net/api/v1/articles?apiKey=${process.env.API_KEY}&search=${search}&category=${categories}`
    );
    for (let s = 0; s < body.data.articles.length; s++) {
      const {
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

    const all = await News.find({ title: { $regex: "Coronavirus" } });

    res.status(200).send(all);
  } catch (error) {
    console.error(error);
    res.status(400).send({ mensaje: "customer error" });
  }
};
