const { ApolloServer } = require("apollo-server");
const favoriteTypeDefs = require("../graphql/type-definitions/favorite");
const favoriteResolvers = require("../graphql/resolvers/favorite");
const listingTypeDefs = require("../graphql/type-definitions/listing");
const listingResolvers = require("../graphql/resolvers/listing");

/**
 * this function takes dataSources and context as input, and creates new apollo server instance
 * this is useful while doing integration testing for resolvers
 * @param {*} dataSources
 * @param {*} context
 * @returns
 */
module.exports = (dataSources, context) => {
  const server = new ApolloServer({
    typeDefs: [favoriteTypeDefs, listingTypeDefs],
    resolvers: [favoriteResolvers, listingResolvers],
    dataSources,
    context,
  });
  return server;
};
