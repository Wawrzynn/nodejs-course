const express = require("express");
const feedController = require("../controllers/feed");

const Router = express.Router();

Router.get("/posts", feedController.getPosts);

Router.post("/post", feedController.createPost);

module.exports = Router;