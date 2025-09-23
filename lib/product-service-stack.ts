import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda functions
    const getProductsListLambda = new lambdaNodejs.NodejsFunction(
      this,
      "GetProductsListLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
        entry: path.join(__dirname, "../lib/lambda/getProductsList/index.ts"),
        handler: "handler", // Entry point of the Lambda function
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
      }
    );

    const getProductByIdLambda = new lambdaNodejs.NodejsFunction(
      this,
      "GetProductByIdLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
        entry: path.join(__dirname, "../lib/lambda/getProductById/index.ts"),
        handler: "handler", // Entry point of the Lambda function
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
      }
    );

    const getOpenApiJsonLambda = new lambdaNodejs.NodejsFunction(
      this,
      "GetOpenApiJsonLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
        entry: path.join(
          __dirname,
          "../lib/lambda/documentation/getOpenApiJson.ts"
        ),
        handler: "handler", // Entry point of the Lambda function
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
      }
    );

    const getSwaggerLambda = new lambdaNodejs.NodejsFunction(
      this,
      "GetSwaggerLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
        entry: path.join(
          __dirname,
          "../lib/lambda/documentation/getSwagger.ts"
        ),
        handler: "handler", // Entry point of the Lambda function
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
      }
    );

    // Define the API Gateway
    const api = new apigateway.RestApi(this, "ProductServiceApi", {
      restApiName: "Product Service API",
      description: "This service handles product-related operations.",
      deployOptions: {
        stageName: "dev", // Set the stage name
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // GET /products
    const productResource = api.root.addResource("products");

    // can be removed after product id is implemented
    productResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsListLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );

    // preparation for product id implementation
    // GET /products/available
    const availableResource = productResource.addResource("available");

    availableResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsListLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );

    // GET /products/{productId}
    const productByIdResource = productResource.addResource("{productId}");
    productByIdResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductByIdLambda),
      {
        methodResponses: [
          { statusCode: "200" },
          { statusCode: "400" },
          { statusCode: "404" },
          { statusCode: "500" },
        ],
      }
    );

    // docs - GET swagger and openApi
    const openApiJsonResource = api.root.addResource("openapi.json");

    openApiJsonResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getOpenApiJsonLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );
    const swaggerResource = api.root.addResource("swagger");

    swaggerResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getSwaggerLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );

    // Output the API Gateway URL
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "The URL of the Product Service API",
    });
  }
}
