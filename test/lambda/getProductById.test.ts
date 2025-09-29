// Mock AWS SDK before imports
const mockSend = jest.fn();
jest.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn().mockImplementation(() => ({})),
}));

jest.mock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: {
    from: jest.fn().mockReturnValue({
      send: mockSend,
    }),
  },
  GetCommand: jest.fn(),
}));

import { handler } from "../../lib/lambda/getProductById";

// Set environment variables for testing
process.env.PRODUCTS_TABLE = "test-products-table";
process.env.STOCK_TABLE = "test-stock-table";

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if productId is missing", async () => {
    const event = { ...baseEvent, pathParameters: null };
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(
      JSON.stringify({ message: "Missing path parameter: productId" })
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("should return 404 if product is not found", async () => {
    const event = { ...baseEvent, pathParameters: { productId: "not-exist" } };
    
    // Mock DynamoDB to return no product
    mockSend.mockResolvedValueOnce({ Item: undefined });

    const result = await handler(event);

    expect(result.statusCode).toBe(404);
    expect(result.body).toBe(
      JSON.stringify({ message: "Product not found: not-exist" })
    );
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("should return 200 and the product with stock if found", async () => {
    const productId = "test-product-1";
    const mockProduct = { 
      id: productId, 
      title: "Test Product", 
      price: 99.99, 
      description: "A test product" 
    };
    const mockStockItem = { product_id: productId, count: 5 };

    const event = { ...baseEvent, pathParameters: { productId } };
    
    mockSend
      .mockResolvedValueOnce({ Item: mockProduct }) // Product found
      .mockResolvedValueOnce({ Item: mockStockItem }); // Stock found

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toBeDefined();
    expect(result.headers && result.headers["Content-Type"]).toBe("application/json");
    expect(result.headers && result.headers["Access-Control-Allow-Origin"]).toBe("*");

    const body = JSON.parse(result.body);
    expect(body).toEqual({
      id: productId,
      title: "Test Product",
      price: 99.99,
      description: "A test product",
      count: 5
    });

    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("should return product with count 0 if no stock found", async () => {
    const productId = "test-product-2";
    const mockProduct = { 
      id: productId, 
      title: "Test Product 2", 
      price: 199.99, 
      description: "Another test product" 
    };

    const event = { ...baseEvent, pathParameters: { productId } };
    
    mockSend
      .mockResolvedValueOnce({ Item: mockProduct }) // Product found
      .mockResolvedValueOnce({ Item: undefined }); // No stock found

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body).toEqual({
      id: productId,
      title: "Test Product 2",
      price: 199.99,
      description: "Another test product",
      count: 0
    });
  });

  it("should return 500 on DynamoDB error", async () => {
    const event = { ...baseEvent, pathParameters: { productId: "test-product" } };
    
    mockSend.mockRejectedValueOnce(new Error("DynamoDB error"));

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: "Internal Server Error" }));
  });
});
