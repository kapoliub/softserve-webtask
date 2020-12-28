const moment = require("moment");
const Posts = require("../models/posts.model");

const getAllPosts = (req, res) => {
  Posts.find({})
    .exec()
    .then((posts) => {
      const data = posts.map(({ date, author, text }) => ({
        author,
        text,
        date: moment(+date).format("DD/MM/YYYY, HH:mm:ss"),
      }));
      return res.json(data);
    })
    .catch((err) => res.status(500).json(err));
};

const addNewPost = (req, res) => {
  Posts.create(req.body)
    .then((newPost) => res.json(newPost))
    .catch((err) => res.status(500).json(err));
};

module.exports = { getAllPosts, addNewPost };
