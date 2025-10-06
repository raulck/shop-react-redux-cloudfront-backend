import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define dynamoDB tables
    const productsTable = new dynamodb.Table(this, "ProductsTable", {
      tableName: "products",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const stockTable = new dynamodb.Table(this, "StockTable", {
      tableName: "stock",
      partitionKey: { name: "product_id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

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
        environment: {
          PRODUCTS_TABLE: productsTable.tableName,
          STOCK_TABLE: stockTable.tableName,
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
        environment: {
          PRODUCTS_TABLE: productsTable.tableName,
          STOCK_TABLE: stockTable.tableName,
        },
      }
    );

    const createProductLambda = new lambdaNodejs.NodejsFunction(
      this,
      "CreateProductLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(__dirname, "../lib/lambda/createProduct/index.ts"),
        handler: "handler",
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },        
        environment: {
          PRODUCTS_TABLE: productsTable.tableName,
          STOCK_TABLE: stockTable.tableName,
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

    // Define /products resource
    const productResource = api.root.addResource("products");

    // GET /products - List all products with stock information
    productResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsListLambda),
      {
        methodResponses: [{ statusCode: "200" }, { statusCode: "500" }],
      }
    );

    // POST /products - Create new product
    productResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createProductLambda),
      {
        methodResponses: [
          { statusCode: "201" },
          { statusCode: "400" },
          { statusCode: "500" },
        ],
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



    // --- Read access for read-only Lambda functions
    const readLambdas = [
      getProductsListLambda,
      getProductByIdLambda,
    ];
    readLambdas.forEach((lambda) => productsTable.grantReadData(lambda));
    readLambdas.forEach((lambda) => stockTable.grantReadData(lambda));

    // --- Write Access for CreateProduct ---
    productsTable.grantWriteData(createProductLambda);
    stockTable.grantWriteData(createProductLambda);

    // Output the API Gateway URL
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "The URL of the Product Service API",
    });

    // Output table names for easier seeding
    new cdk.CfnOutput(this, "ProductsTableName", {
      value: productsTable.tableName,
      description: "Name of the Products DynamoDB table",
    });

    new cdk.CfnOutput(this, "StockTableName", {
      value: stockTable.tableName,
      description: "Name of the Stock DynamoDB table",
    });

  }
}
