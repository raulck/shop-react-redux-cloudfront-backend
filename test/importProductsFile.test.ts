jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn(() => Promise.resolve("https://signed-url")),
}));

jest.mock("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn(() => ({})),
  PutObjectCommand: jest.fn(),
}));

jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn(() => Promise.resolve("https://signed-url")),
}));

jest.mock("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn(() => ({})),
  PutObjectCommand: jest.fn(),
}));

import { handler } from "../lib/lambdas/import/importProductsFile";

describe("importProductsFile Lambda", () => {
  beforeAll(() => {
    process.env.BUCKET_NAME = "test-bucket";
    process.env.AWS_REGION = "eu-north-1";
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    jest.restoreAllMocks();
  });

  it("should return 400 if no file name is provided", async () => {
    const event = { queryStringParameters: { name: undefined } };
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(
      "Query param name is required and must end with .csv"
    );
  });

  it("should return 400 if file name doesn't end with .csv", async () => {
    const event = { queryStringParameters: { name: "test.txt" } };
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(
      "Query param name is required and must end with .csv"
    );
  });

  it("should return signed URL when valid CSV file name is provided", async () => {
    const event = { queryStringParameters: { name: "test.csv" } };
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe("https://signed-url");
    expect(result.headers).toEqual({ "Access-Control-Allow-Origin": "*" });
  });

  it("should handle errors and return 500", async () => {
    // Mock getSignedUrl to throw an error
    const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
    getSignedUrl.mockRejectedValueOnce(new Error("S3 error"));

    const event = { queryStringParameters: { name: "test.csv" } };
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(result.body).toBe("Internal Server Error");
    expect(result.headers).toEqual({ "Access-Control-Allow-Origin": "*" });
  });
});
