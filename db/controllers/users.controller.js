const Users = require("../models/users.model");

const getUsers = (req, res) => {
  Users.find({})
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};
const loginUser = (req, res) => {
  Users.findOne({ role: "admin" })
    .then((user) =>
      res.json(
        user.mail === req.body.mail && user.password === req.body.password
      )
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = { getUsers, loginUser };
