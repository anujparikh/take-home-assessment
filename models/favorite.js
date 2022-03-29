const mongoose = require("mongoose");
const Favorite = require("../service/favorite");

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  mlsId: { type: Number, unique: true },
  counter: { type: Number, default: 0 },
});

FavoriteSchema.path("mlsId").required(true, "MLS ID cannot be empty");

FavoriteSchema.methods = {};

FavoriteSchema.statics = {
  /**
   * Fetching all the favorite counts for provided mlsIds
   * @param {Array<Number>} mlsIds
   * @returns
   */
  findAllByMlsIds: async function (mlsIds) {
    const favorite = new Favorite(this);
    return favorite.findAllByMlsIds(mlsIds);
  },

  /**
   * Adds favorite for a property listing
   * @param {Number} mlsId
   */
  addFavoriteByMlsId: async function (mlsId) {
    const favorite = new Favorite(this);
    return favorite.addFavoriteByMlsId(mlsId);
  },

  /**
   * Remove favorite for a property listing
   * @param {Number} mlsId
   */
  removeFavoriteByMlsId: function (mlsId) {
    const favorite = new Favorite(this);
    return favorite.removeFavoriteByMlsId(mlsId);
  },
};

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

module.exports = FavoriteModel;
