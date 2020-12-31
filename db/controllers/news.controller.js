const News = require("../models/news.model");

const createNews = (req, res) => {
  News.create(req.body)
    .then((newNews) => res.json(newNews))
    .catch((err) => res.status(500).json(err));
};

const getAllNews = (req, res) => {
  News.find({})
    .exec()
    .then((news) => res.json(news))
    .catch((err) => res.status(500).json(err));
};

module.exports = { createNews, getAllNews };
