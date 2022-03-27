const mongoose = require("mongoose");
const Favorite = require("../service/favorite");

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  mlsId: { type: Number, unique: true },
  counter: { type: Number, default: 0 },
});

FavoriteSchema.path("mlsId").required(true, "MLS ID cannot be empty");

FavoriteSchema.methods = {
  /**
   * Adds favorite for a property listing
   * @param {Number} mlsId
   */
  addFavoriteByMlsId: function (mlsId) {
    const favorite = new Favorite(this);
    favorite.addFavoriteByMlsId(mlsId);
  },

  /**
   * Remove favorite for a property listing
   * @param {Number} mlsId
   */
  removeFavoriteByMlsId: function (mlsId) {
    const favorite = new Favorite(this);
    favorite.removeFavoriteByMlsId(mlsId);
  },
};

FavoriteSchema.statics = {
  getByMlsId: async function (mlsId) {
    const favorite = new Favorite(this);
    return favorite.findOneByMlsId(mlsId);
  },
};

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

module.exports = FavoriteModel;
