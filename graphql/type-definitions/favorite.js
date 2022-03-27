const { gql } = require("apollo-server");

module.exports = gql`
  type Favorite {
    _id: ID
    mlsId: Int
    counter: Int
  }

  type Query {
    favoriteById(mlsId: Int!): Favorite
  }
`;
