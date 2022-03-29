const mockingoose = require("mockingoose");
const SimplyRetsAPI = require("../../datasource/simply-rets");
const FavoriteModel = require("../../models/favorite");
const createMockServer = require("../../test-utils/mock-apollo-server");

const mockSimplyRetsAPI = new SimplyRetsAPI();
mockFindListings = jest.fn().mockReturnValue([
  {
    property: {
      roof: "Tile",
      cooling: null,
      style: "Traditional",
    },
    mlsId: 95,
    showingContactPhone: null,
    address: {
      crossStreet: "Dunne Ave",
      state: "Texas",
      country: "United States",
      postalCode: "77096",
      streetName: "East Sweet Bottom Br",
      streetNumberText: "74434",
      city: "Houston",
    },
  },
]);
mockSimplyRetsAPI.findListings = mockFindListings;

const mockDataSources = () => ({
  simplyRetsAPI: mockSimplyRetsAPI,
});
const mockContext = () => ({
  FavoriteModel,
});

const mockServer = createMockServer(mockDataSources, mockContext);
const originalEnv = process.env;

describe("resolver function for listing", () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SIMPLY_RETS_URL: "dummy-baseUrl",
      SIMPLY_RETS_LOGIN: "dummy-login",
      SIMPLY_RETS_SECRET: "dummy-secret",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });
  it("when query for fetching listing, proper method from datasource should get called", async () => {
    await mockServer.executeOperation({
      query: `
      query Properties {
        properties {
          favoriteCount
          mlsId
        }
      }
      `,
    });
    expect(mockFindListings).toHaveBeenCalledTimes(1);
  });

  it("when query for fetching listing with city filter, proper method from datasource should get called", async () => {
    await mockServer.executeOperation({
      query: `
      query Properties {
        properties(city: "Houston") {
          favoriteCount
          mlsId
        }
      }
      `,
    });
    expect(mockFindListings).toHaveBeenCalledWith("Houston");
  });

  it("when query for fetching listing with city filter, should also return favorite counter of that listing", async () => {
    const mockResponse = [
      {
        mlsId: 95,
        counter: 100,
      },
    ];
    mockingoose(FavoriteModel).toReturn(mockResponse, "find");
    const results = await mockServer.executeOperation({
      query: `
      query Properties {
        properties(city: "Houston") {
          favoriteCount
          mlsId
          address {
            city
          }
        }
      }
      `,
    });
    expect(results.data.properties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          favoriteCount: 100,
          mlsId: 95,
          address: {
            city: "Houston",
          },
        }),
      ])
    );
    expect(mockFindListings).toHaveBeenCalledWith("Houston");
  });

  it("when query for fetching listing with no favorite, should also return favorite counter as null", async () => {
    mockingoose(FavoriteModel).toReturn([], "find");
    const results = await mockServer.executeOperation({
      query: `
      query Properties {
        properties(city: "Houston") {
          favoriteCount
          mlsId
          address {
            city
          }
        }
      }
      `,
    });
    expect(results.data.properties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          favoriteCount: null,
          mlsId: 95,
          address: {
            city: "Houston",
          },
        }),
      ])
    );
    expect(mockFindListings).toHaveBeenCalledWith("Houston");
  });
});
