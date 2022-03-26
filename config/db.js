// we can keep this as separate file if number of config variables increases
module.exports = {
  development: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/",
  },
  test: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/",
  },
  producation: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/",
  },
};
