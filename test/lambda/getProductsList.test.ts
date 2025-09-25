import { handler } from "../../lib/lambda/getProductsList";
import { mockProducts } from "../../lib/lambda/mocks/products";

const mockEvent = {
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: "/",
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {} as any,
  resource: "/",
};

describe("Lambda handler GetProductsListLambda", () => {
  it("should return 200 and mockItems", async () => {
    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toBeDefined();
    expect(result.headers && result.headers["Content-Type"]).toBe(
      "application/json"
    );
    expect(result.body).toBe(JSON.stringify(mockProducts));
  });
});
