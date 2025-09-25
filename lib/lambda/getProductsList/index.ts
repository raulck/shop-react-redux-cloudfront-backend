import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { mockProducts } from "../mocks/products";

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allowed HTTP methods
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
      },
      body: JSON.stringify(mockProducts),
    };
  } catch (err) {
    console.error("Error in getProductsList:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
