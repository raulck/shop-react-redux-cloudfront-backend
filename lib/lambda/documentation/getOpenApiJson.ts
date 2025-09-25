import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { openapi } from "../../openapi/openapi";

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Allow all origins
    },
    body: JSON.stringify(openapi),
  };
};
