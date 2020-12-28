const Users = require("../models/users.model");

const getUsers = (req, res) => {
  Users.find({})
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};
const createUser = (req, res) => {
      Users.create(req.body)
        .then((createUser) => res.json(createUser))
        .catch((err) => res.status(500).json(err));
    };

module.exports = {getUsers, createUser};