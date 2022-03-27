const mongoose = require("mongoose");
const Favorite = require("../service/favorite");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  token: { type: String },
});

UserSchema.path("email").required(true, "Email cannot be empty");

UserSchema.methods = {};

UserSchema.statics = {
  list: async function () {
    return await this.find({}).exec();
  },
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
