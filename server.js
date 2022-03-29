const { ApolloServer, AuthenticationError } = require("apollo-server");
const favoriteTypeDefs = require("./graphql/type-definitions/favorite");
const favoriteResolvers = require("./graphql/resolvers/favorite");
const listingTypeDefs = require("./graphql/type-definitions/listing");
const listingResolvers = require("./graphql/resolvers/listing");
const FavoriteModel = require("./models/favorite");
const UserModel = require("./models/user");
const SimplyRetsAPI = require("./datasource/simply-rets");

/**
 * Creates apollo server instance and also checks if the token received
 * with req.headers is valid user token
 * @param {*} options
 * @returns
 */
module.exports = async (options = { port: process.env.PORT || 4000 }) => {
  const server = new ApolloServer({
    typeDefs: [favoriteTypeDefs, listingTypeDefs],
    resolvers: [favoriteResolvers, listingResolvers],
    dataSources: () => ({
      simplyRetsAPI: new SimplyRetsAPI(),
    }),
    context: async ({ req }) => {
      const requestToken = req.headers.authorization;
      const user = await UserModel.getUserByToken(requestToken);
      if (!user) {
        throw new AuthenticationError("Invalid token passed");
      }
      return {
        user,
        FavoriteModel,
        UserModel,
      };
    },
  });

  const serverInfo = await server.listen(options);
  console.log(`Server is ready at ${serverInfo.url}`);
  return serverInfo;
};
