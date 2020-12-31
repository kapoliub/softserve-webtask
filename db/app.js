const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { loginUser } = require("./controllers/users.controller");
const { getAllPosts, addNewPost } = require("./controllers/posts.controller");
const { getAllNews, createNews } = require("./controllers/news.controller");

require("dotenv").config();

const PORT = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.post("/login", loginUser);

app.get("/posts", getAllPosts);
app.post("/posts", addNewPost);

app.get("/news", getAllNews);
app.post("/news", createNews);

//server
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  )
  .catch((err) =>
    console.error(`Error connecting to mongo: ${mongoURL}, ${err}`)
  );
