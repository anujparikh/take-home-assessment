const path = require("path");

const dbConfig = require("./db");

module.exports = {
  dbConfig: dbConfig[process.env.NODE_ENV || "development"],
};
