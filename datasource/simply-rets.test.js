const SimplyRetsAPI = require("./simply-rets");

const mockGetFunction = jest.fn();
jest.mock("apollo-datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGetFunction;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});

describe("SimplyRETS datasource methods", () => {
  afterEach(() => {
    mockGetFunction.mockClear();
  });

  it("when findListings is called it should send out proper API request to SimplyRETS", async () => {
    const simplyRetsDataSource = new SimplyRetsAPI();
    await simplyRetsDataSource.findListings();

    expect(mockGetFunction).toBeCalledWith(
      "properties",
      undefined,
      expect.anything()
    );
  });

  it("when findListings is called with city filter it should send out proper API request to SimplyRETS", async () => {
    const simplyRetsDataSource = new SimplyRetsAPI();
    await simplyRetsDataSource.findListings("foo");

    expect(mockGetFunction).toBeCalledWith(
      "properties?q=foo",
      undefined,
      expect.anything()
    );
  });

  afterAll(() => {
    mockGetFunction.mockRestore();
  });
});
