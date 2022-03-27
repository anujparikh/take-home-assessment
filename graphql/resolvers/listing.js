const fetchListing = async (_, { cityFilter }, { dataSources }) => {
  const result = await dataSources.simplyRetsAPI.findListings(cityFilter);
  return result;
};

module.exports = {
  Query: {
    fetchListing,
  },
};
