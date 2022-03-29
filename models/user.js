const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  token: { type: String },
});

UserSchema.path("email").required(true, "Email cannot be empty");

UserSchema.statics = {
  /**
   * fetch user based on token input
   * @param {String} token
   * @returns
   */
  getUserByToken: async function (token) {
    return await this.findOne({ token }).exec();
  },
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
