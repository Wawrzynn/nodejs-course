const mongoose = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://jedrzejkosakowski:Lewandowski10@nodejs.suz4vyq.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
