const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getUsers, createUser } = require("./controllers/users.controller");
const { getAllPosts, addNewPost } = require("./controllers/posts.controller");

const PORT = 8080;
const mongoURL =
  "mongodb+srv://admin:iQU1DnNTT0xpMJkH@cluster0.dpk6w.mongodb.net/webtask?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/users', getUsers)
app.get('/posts', getAllPosts)
app.post('/posts', addNewPost)
//server
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  )
  .catch((err) => console.error(`Error connecting to mongo: ${URI}, ${err}`));
