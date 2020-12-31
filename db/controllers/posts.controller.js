const Posts = require("../models/posts.model");

const getAllPosts = (req, res) => {
  Posts.find({})
    .exec()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(500).json(err));
};

const addNewPost = (req, res) => {
  Posts.create(req.body)
    .then((newPost) => res.json(newPost))
    .catch((err) => res.status(500).json(err));
};

module.exports = { getAllPosts, addNewPost };
