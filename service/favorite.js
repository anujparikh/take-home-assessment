class Favorite {
  constructor(model) {
    this.model = model;
  }
  /**
   * Adds favorite for a property listing
   * @param {Number} mlsId
   */
  addFavoriteByMlsId(mlsId) {
    const filter = { mlsId };
    const update = {
      $inc: { counter: 1 },
    };
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
  }

  /**
   * Remove favorite for a property listing
   * @param {Number} mlsId
   */
  removeFavoriteByMlsId(mlsId) {
    const filter = { mlsId };
    const update = {
      $inc: { counter: -1 },
    };
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
  }

  /**
   * Fetch Favorite information by mls id
   * @param {Number} mlsId
   * @returns
   */
  findOneByMlsId(mlsId) {
    return this.model.findOne({ mlsId }).exec();
  }
}

module.exports = Favorite;
