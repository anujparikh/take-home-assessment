const { RESTDataSource } = require("apollo-datasource-rest");

class SimplyRetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SIMPLY_RETS_URL;
    this.username = process.env.SIMPLY_RETS_LOGIN;
    this.secret = process.env.SIMPLY_RETS_SECRET;
  }

  async findListings(cityFilter) {
    const filters = [cityFilter]
      .map((filter) => `q=${filter}`)
      .reduce((prev, curr) => `${prev}&${curr}`, "");
    return await this.get(
      `properties${filters !== "" ? `?${filters.substring(1)}` : ""}`,
      undefined,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${this.username}:${this.secret}`
          ).toString("base64")}`,
        },
      }
    );
  }
}

module.exports = SimplyRetsAPI;
