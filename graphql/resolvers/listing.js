/**
 * this is resolver function for query requesting listing with their favorite count
 * @param {*} _ parent (not required in current scenario)
 * @param {*} param1 args from the request
 * @param {*} param2 context from apollo server
 * @returns all the listings with corresponding favorite count number
 */
const properties = async (_, { city }, { dataSources, FavoriteModel }) => {
  const result = await dataSources.simplyRetsAPI.findListings(city);
  const mlsIdsForFetchingFavoriteCounts = result.map(
    (listing) => listing.mlsId
  );
  const favoriteCounts = await FavoriteModel.findAllByMlsIds(
    mlsIdsForFetchingFavoriteCounts
  );
  const finalListings = result.map((listing) => {
    const index = favoriteCounts.findIndex(
      (favorite) => favorite.mlsId === listing.mlsId
    );
    return index !== -1
      ? { ...listing, ...{ favoriteCount: favoriteCounts[index].counter } }
      : listing;
  });
  return finalListings;
};

module.exports = {
  Query: {
    properties,
  },
};
