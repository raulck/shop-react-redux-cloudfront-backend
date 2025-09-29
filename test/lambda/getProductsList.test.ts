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
  ScanCommand: jest.fn(),
}));

import { handler } from "../../lib/lambda/getProductsList";

// Set environment variables for testing
process.env.PRODUCTS_TABLE = "test-products-table";
process.env.STOCK_TABLE = "test-stock-table";

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and joined products with stock", async () => {
    const mockProducts = [
      { id: "1", title: "Product 1", price: 100, description: "Description 1" },
      { id: "2", title: "Product 2", price: 200, description: "Description 2" },
    ];
    const mockStock = [
      { product_id: "1", count: 5 },
      { product_id: "2", count: 3 },
    ];

    mockSend
      .mockResolvedValueOnce({ Items: mockProducts }) // First call for products
      .mockResolvedValueOnce({ Items: mockStock }); // Second call for stock

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(200);
    expect(result.headers).toBeDefined();
    expect(result.headers && result.headers["Content-Type"]).toBe("application/json");
    expect(result.headers && result.headers["Access-Control-Allow-Origin"]).toBe("*");
    
    const body = JSON.parse(result.body);
    expect(body).toHaveLength(2);
    expect(body[0]).toEqual({ id: "1", title: "Product 1", price: 100, description: "Description 1", count: 5 });
    expect(body[1]).toEqual({ id: "2", title: "Product 2", price: 200, description: "Description 2", count: 3 });

    // Verify DynamoDB calls
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("should handle products with no stock", async () => {
    const mockProducts = [
      { id: "1", title: "Product 1", price: 100, description: "Description 1" },
    ];
    const mockStock: { product_id: string; count: number }[] = []; // No stock items

    mockSend
      .mockResolvedValueOnce({ Items: mockProducts })
      .mockResolvedValueOnce({ Items: mockStock });

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual({ id: "1", title: "Product 1", price: 100, description: "Description 1", count: 0 });
  });

  it("should handle empty products table", async () => {
    mockSend
      .mockResolvedValueOnce({ Items: [] }) // Empty products
      .mockResolvedValueOnce({ Items: [] }); // Empty stock

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body).toEqual([]);
  });

  it("should handle partial stock matches", async () => {
    const mockProducts = [
      { id: "1", title: "Product 1", price: 100, description: "Description 1" },
      { id: "2", title: "Product 2", price: 200, description: "Description 2" },
      { id: "3", title: "Product 3", price: 300, description: "Description 3" },
    ];
    const mockStock = [
      { product_id: "1", count: 5 },
      // Missing stock for product 2
      { product_id: "3", count: 10 },
    ];

    mockSend
      .mockResolvedValueOnce({ Items: mockProducts })
      .mockResolvedValueOnce({ Items: mockStock });

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body).toHaveLength(3);
    expect(body[0]).toEqual({ id: "1", title: "Product 1", price: 100, description: "Description 1", count: 5 });
    expect(body[1]).toEqual({ id: "2", title: "Product 2", price: 200, description: "Description 2", count: 0 });
    expect(body[2]).toEqual({ id: "3", title: "Product 3", price: 300, description: "Description 3", count: 10 });
  });

  it("should return 500 on DynamoDB error", async () => {
    mockSend.mockRejectedValueOnce(new Error("DynamoDB error"));

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(500);
    expect(result.headers && result.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(result.body).toBe(JSON.stringify({ message: "Internal Server Error" }));
  });
});
