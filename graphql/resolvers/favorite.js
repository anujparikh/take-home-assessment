const favoriteById = async (_, { mlsId }, context) => {
  const { FavoriteModel } = context;
  const result = await FavoriteModel.getByMlsId(mlsId);
  return result;
};

const markFavoriteById = async (_, { mlsId }, context) => {
  const { FavoriteModel } = context;
  const result = await FavoriteModel.addFavoriteByMlsId(mlsId);
  return result;
};

const unmarkFavoriteById = async (_, { mlsId }, context) => {
  const { FavoriteModel } = context;
  const result = await FavoriteModel.removeFavoriteByMlsId(mlsId);
  return result;
};

module.exports = {
  Query: {
    favoriteById,
  },
  Mutation: {
    markFavoriteById,
    unmarkFavoriteById,
  },
};
