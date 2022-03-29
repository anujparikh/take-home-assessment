const mockingoose = require("mockingoose");
const SimplyRetsAPI = require("../../datasource/simply-rets");
const FavoriteModel = require("../../models/favorite");
const createMockServer = require("../../test-utils/mock-apollo-server");

const mockSimplyRetsAPI = new SimplyRetsAPI();

const mockDataSources = () => ({
  simplyRetsAPI: mockSimplyRetsAPI,
});
const mockContext = () => ({
  FavoriteModel,
});

const mockServer = createMockServer(mockDataSources, mockContext);

describe("resolver function for favorite entity", () => {
  it("when query for fetching favorite counter by mlsIds is called, it should send out proper response", async () => {
    const mockResponse = [
      {
        mlsId: 1,
        counter: 100,
      },
    ];
    mockingoose(FavoriteModel).toReturn(mockResponse, "find");

    const result = await mockServer.executeOperation({
      query: `
      query FetchFavoriteCountByMlsIds {
        fetchFavoriteCountByMlsIds(mlsIds: [1]) {
            mlsId
            counter
        }
      }
      `,
    });
    expect(result.data.fetchFavoriteCountByMlsIds).toEqual(
      expect.arrayContaining([expect.objectContaining(mockResponse[0])])
    );
  });

  it("when marking favorite, it should send out proper response", async () => {
    mockingoose(FavoriteModel).toReturn(
      {
        mlsId: 1,
        counter: 21,
      },
      "findOneAndUpdate"
    );

    const result = await mockServer.executeOperation({
      query: `
      mutation MarkFavoriteById {
        markFavoriteById(mlsId: 1) {
          counter
          mlsId
        }
      }
      `,
    });
    expect(result.data.markFavoriteById).toMatchObject({
      mlsId: 1,
      counter: 21,
    });
  });

  it("when unmarking favorite, it should send out proper response", async () => {
    mockingoose(FavoriteModel).toReturn(
      {
        mlsId: 1,
        counter: 19,
      },
      "findOneAndUpdate"
    );

    const result = await mockServer.executeOperation({
      query: `
      mutation UnmarkFavoriteById {
        unmarkFavoriteById(mlsId: 1) {
          counter
          mlsId
        }
      }
      `,
    });
    expect(result.data.unmarkFavoriteById).toMatchObject({
      mlsId: 1,
      counter: 19,
    });
  });
});
