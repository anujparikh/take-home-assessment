const favoriteById = async (parent, { mlsId }, context, info) => {
  const { FavoriteModel } = context;
  const result = await FavoriteModel.getByMlsId(mlsId);
  return result;
};

const markFavoriteById = async (parent, { mlsId }, context, info) => {
  const { FavoriteModel } = context;
  const result = await FavoriteModel.addFavoriteByMlsId(mlsId);
  return result;
};

const unmarkFavoriteById = async (parent, { mlsId }, context, info) => {
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
