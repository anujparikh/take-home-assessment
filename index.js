const { ApolloServer } = require("apollo-server");
const { readdirSync } = require("fs");
const join = require("path").join;
require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config");
const favoriteTypeDefs = require("./graphql/type-definitions/favorite");
const favoriteResolvers = require("./graphql/resolvers/favorite");
const FavoriteModel = require("./models/favorite");
const UserModel = require("./models/user");
console.log(config.dbConfig.url);

const models = join(__dirname, "./models");

const createServer = () => {
  const server = new ApolloServer({
    typeDefs: [favoriteTypeDefs],
    resolvers: [favoriteResolvers],
    context: () => ({
      favoriteModel: FavoriteModel,
      userModel: UserModel,
    }),
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server is ready at ${url}`);
  });
};

readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

const connect = () => {
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", connect)
    .once("open", createServer);
  mongoose.set("debug", process.env.ENVIRONMENT !== "production"); // TODO: remove this for production env
  return mongoose.connect(config.dbConfig.url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();
