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
    this.model.findOneAndUpdate(filter, update, {
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
    this.model.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
  }

  findOneByMlsId(mlsId) {
    return this.model.findOne({ mlsId }).exec();
  }
}

module.exports = Favorite;
