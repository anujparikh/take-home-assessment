const { readdirSync } = require("fs");
const join = require("path").join;
require("dotenv").config();
const mongoose = require("mongoose");

const config = require("./config");
const createApolloServer = require("./server");
const models = join(__dirname, "./models");

readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

// connects to mongodb through mongoose ORM
// once the connection is done, it calls the function to create
// instance of apollo server
const connect = () => {
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", connect)
    .once("open", createApolloServer);
  return mongoose.connect(config.dbConfig.url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();
