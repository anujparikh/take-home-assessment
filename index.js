const { ApolloServer } = require("apollo-server");
const { readFileSync } = require("fs");
const mongoose = require("mongoose");
const config = require("./config");
require("dotenv").config();

const resolvers = require("./resolvers");
const typeDefs = readFileSync("./schema.graphql").toString("utf-8");

const createServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen({ port: process.env.SERVER_PORT }, () =>
    console.log(
      `Listening on http://localhost:${process.env.SERVER_PORT}/graphql`
    )
  );
};

const connect = () => {
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", connect)
    .once("open", createServer);
  return mongoose.connect(config.dbConfig.url, {
    keepAlive: true,
  });
};

connect();
