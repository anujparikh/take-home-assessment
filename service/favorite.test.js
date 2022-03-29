const mockingoose = require("mockingoose");
const FavoriteModel = require("./../models/favorite");
const Favorite = require("./favorite");

describe("Service layer for Favorite entity", () => {
  it("when addFavoriteByMlsId is called, should call findOneAndUpdate method with proper request", async () => {
    const favoriteModelSpy = jest.spyOn(FavoriteModel, "findOneAndUpdate");
    const favoriteService = new Favorite(FavoriteModel);
    await favoriteService.addFavoriteByMlsId(1);
    expect(favoriteModelSpy).toBeCalledWith(
      { mlsId: 1 },
      { $inc: { counter: 1 } },
      { new: true, upsert: true }
    );
  });

  it("when addFavoriteByMlsId is called, should send proper response back", async () => {
    mockingoose(FavoriteModel).toReturn(
      {
        mlsId: 1,
        counter: 1,
      },
      "findOneAndUpdate"
    );

    const favoriteService = new Favorite(FavoriteModel);
    const results = await favoriteService.addFavoriteByMlsId(1);
    expect(results).toMatchObject({ mlsId: 1, counter: 1 });
  });

  it("when removeFavoriteByMlsId is called, should call findOneAndUpdate method with proper request", async () => {
    const favoriteModelSpy = jest.spyOn(FavoriteModel, "findOneAndUpdate");
    const favoriteService = new Favorite(FavoriteModel);
    await favoriteService.removeFavoriteByMlsId(1);
    expect(favoriteModelSpy).toBeCalledWith(
      { mlsId: 1 },
      { $inc: { counter: -1 } },
      { new: true, upsert: true }
    );
  });

  it("when findOneByMlsId is called, should send proper response back", async () => {
    mockingoose(FavoriteModel).toReturn(
      {
        mlsId: 1,
        counter: 1,
      },
      "findOne"
    );

    const favoriteService = new Favorite(FavoriteModel);
    const results = await favoriteService.findOneByMlsId(1);
    expect(results).toMatchObject({ mlsId: 1, counter: 1 });
  });

  it("when findAllByMlsIds is called, should send proper array response back", async () => {
    const mockResponse = [
      {
        mlsId: 1,
        counter: 1,
      },
      {
        mlsId: 2,
        counter: 100,
      },
      {
        mlsId: 3,
        counter: 2,
      },
    ];
    mockingoose(FavoriteModel).toReturn(mockResponse, "find");

    const favoriteService = new Favorite(FavoriteModel);
    const results = await favoriteService.findAllByMlsIds(["1", "2", "3"]);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining(mockResponse[0]),
        expect.objectContaining(mockResponse[1]),
        expect.objectContaining(mockResponse[2]),
      ])
    );
  });
});
