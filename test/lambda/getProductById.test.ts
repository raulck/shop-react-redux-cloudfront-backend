import { handler } from "../../lib/lambda/getProductById";
import { mockProducts } from "../../lib/lambda/mocks/products";

const baseEvent = {
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

describe("Lambda handler GetProductByIdLambda", () => {
  it("should return 400 if productId is missing", async () => {
    const event = { ...baseEvent, pathParameters: null };
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(
      JSON.stringify({ message: "Missing path parameter: productId" })
    );
  });

  it("should return 404 if product is not found", async () => {
    const event = { ...baseEvent, pathParameters: { productId: "not-exist" } };
    const result = await handler(event);

    expect(result.statusCode).toBe(404);
    expect(result.body).toBe(
      JSON.stringify({ message: "Product not found: not-exist" })
    );
  });

  it("should return 200 and the product if found", async () => {
    const product = mockProducts[0];
    const event = { ...baseEvent, pathParameters: { productId: product.id } };
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(product));
  });
});
