const favoriteById = async (parent, { mlsId }, context, info) => {
  const { favoriteModel } = context;
  const result = await favoriteModel.getByMlsId(mlsId);
  console.log(result);
  return result;
};

module.exports = {
  Query: {
    favoriteById,
  },
};
