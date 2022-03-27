const { gql } = require("apollo-server");

module.exports = gql`
  type Favorite {
    _id: ID
    mlsId: Int
    counter: Int
  }

  type Query {
    fetchFavoriteCountByMlsId(mlsId: [Int!]): Favorite
  }

  type Mutation {
    markFavoriteById(mlsId: Int!): Favorite
    unmarkFavoriteById(mlsId: Int!): Favorite
  }
`;
