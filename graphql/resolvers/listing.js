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
