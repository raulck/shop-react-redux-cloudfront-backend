"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const lambdaNodejs = __importStar(require("aws-cdk-lib/aws-lambda-nodejs"));
const apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const path = __importStar(require("path"));
class ProductServiceStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Define the Lambda function
        const getProductsListLambda = new lambdaNodejs.NodejsFunction(this, "GetProductsListLambda", {
            runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
            entry: path.join(__dirname, "../lib/lambda/getProductsList/index.ts"),
            handler: "handler", // Entry point of the Lambda function
            bundling: {
                forceDockerBundling: false, // Ensure Docker is not used
                minify: true, // Optional: Minify the code
                sourceMap: true, // Optional: Include source maps
                externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
            },
        });
        const getProductByIdLambda = new lambdaNodejs.NodejsFunction(this, "GetProductByIdLambda", {
            runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
            entry: path.join(__dirname, "../lib/lambda/getProductById/index.ts"),
            handler: "handler", // Entry point of the Lambda function
            bundling: {
                forceDockerBundling: false, // Ensure Docker is not used
                minify: true, // Optional: Minify the code
                sourceMap: true, // Optional: Include source maps
                externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
            },
        });
        const getOpenApiJsonLambda = new lambdaNodejs.NodejsFunction(this, "GetOpenApiJsonLambda", {
            runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
            entry: path.join(__dirname, "../lib/lambda/documentation/getOpenApiJson.ts"),
            handler: "handler", // Entry point of the Lambda function
            bundling: {
                forceDockerBundling: false, // Ensure Docker is not used
                minify: true, // Optional: Minify the code
                sourceMap: true, // Optional: Include source maps
                externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
            },
        });
        const getSwaggerLambda = new lambdaNodejs.NodejsFunction(this, "GetSwaggerLambda", {
            runtime: lambda.Runtime.NODEJS_20_X, // Use Node.js 20.x runtime
            entry: path.join(__dirname, "../lib/lambda/documentation/getSwagger.ts"),
            handler: "handler", // Entry point of the Lambda function
            bundling: {
                forceDockerBundling: false, // Ensure Docker is not used
                minify: true, // Optional: Minify the code
                sourceMap: true, // Optional: Include source maps
                externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
            },
        });
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
        const productResource = api.root.addResource("product");
        // GET /product/available
        const availableResource = productResource.addResource("available");
        availableResource.addMethod("GET", new apigateway.LambdaIntegration(getProductsListLambda), {
            methodResponses: [{ statusCode: "200" }],
        });
        // GET /products/{productId}
        const productByIdResource = productResource.addResource("{productId}");
        productByIdResource.addMethod("GET", new apigateway.LambdaIntegration(getProductByIdLambda), {
            methodResponses: [
                { statusCode: "200" },
                { statusCode: "400" },
                { statusCode: "404" },
                { statusCode: "500" },
            ],
        });
        // docs - GET swagger and openApi
        const openApiJsonResource = api.root.addResource("openapi.json");
        openApiJsonResource.addMethod("GET", new apigateway.LambdaIntegration(getOpenApiJsonLambda), {
            methodResponses: [{ statusCode: "200" }],
        });
        const swaggerResource = api.root.addResource("swagger");
        swaggerResource.addMethod("GET", new apigateway.LambdaIntegration(getSwaggerLambda), {
            methodResponses: [{ statusCode: "200" }],
        });
        // Output the API Gateway URL
        new cdk.CfnOutput(this, "ApiUrl", {
            value: api.url,
            description: "The URL of the Product Service API",
        });
    }
}
exports.ProductServiceStack = ProductServiceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZXJ2aWNlLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZHVjdC1zZXJ2aWNlLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBRW5DLCtEQUFpRDtBQUNqRCw0RUFBOEQ7QUFDOUQsdUVBQXlEO0FBQ3pELDJDQUE2QjtBQUU3QixNQUFhLG1CQUFvQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2hELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkJBQTZCO1FBQzdCLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUMzRCxJQUFJLEVBQ0osdUJBQXVCLEVBQ3ZCO1lBQ0UsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLDJCQUEyQjtZQUNoRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsd0NBQXdDLENBQUM7WUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBRSxxQ0FBcUM7WUFDekQsUUFBUSxFQUFFO2dCQUNSLG1CQUFtQixFQUFFLEtBQUssRUFBRSw0QkFBNEI7Z0JBQ3hELE1BQU0sRUFBRSxJQUFJLEVBQUUsNEJBQTRCO2dCQUMxQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGdDQUFnQztnQkFDakQsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUseUVBQXlFO2FBQ3hHO1NBQ0YsQ0FDRixDQUFDO1FBRUYsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQzFELElBQUksRUFDSixzQkFBc0IsRUFDdEI7WUFDRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsMkJBQTJCO1lBQ2hFLEtBQUssRUFBRSxJQUFJLENB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Q3REO1lBQ0UsZUFBZSxFQUFFO2dCQUNmLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtnQkFDckIsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO2dCQUNyQixFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7Z0JBQ3JCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTthQUN0QjtTQUNGLENBQ0YsQ0FBQztRQUVGLGlDQUFpQztRQUNqQyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpFLG1CQUFtQixDQUFDLFNBQVMsQ0FDM0IsS0FBSyxFQUNMLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLEVBQ3REO1lBQ0UsZUFBZSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDekMsQ0FDRixDQUFDO1FBQ0YsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEQsZUFBZSxDQUFDLFNBQVMsQ0FDdkIsS0FBSyxFQUNMLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEVBQ2xEO1lBQ0UsZUFBZSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDekMsQ0FDRixDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2hDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRztZQUNkLFdBQVcsRUFBRSxvQ0FBb0M7U0FDbEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBOUlELGtEQThJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGxhbWJkYU5vZGVqcyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ub2RlanNcIjtcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gRGVmaW5lIHRoZSBMYW1iZGEgZnVuY3Rpb25cbiAgICBjb25zdCBnZXRQcm9kdWN0c0xpc3RMYW1iZGEgPSBuZXcgbGFtYmRhTm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIFwiR2V0UHJvZHVjdHNMaXN0TGFtYmRhXCIsXG4gICAgICB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18yMF9YLCAvLyBVc2UgTm9kZS5qcyAyMC54IHJ1bnRpbWVcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vbGliL2xhbWJkYS9nZXRQcm9kdWN0c0xpc3QvaW5kZXgudHNcIiksXG4gICAgICAgIGhhbmRsZXI6IFwiaGFuZGxlclwiLCAvLyBFbnRyeSBwb2ludCBvZiB0aGUgTGFtYmRhIGZ1bmN0aW9uXG4gICAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgICAgZm9yY2VEb2NrZXJCdW5kbGluZzogZmFsc2UsIC8vIEVuc3VyZSBEb2NrZXIgaXMgbm90IHVzZWRcbiAgICAgICAgICBtaW5pZnk6IHRydWUsIC8vIE9wdGlvbmFsOiBNaW5pZnkgdGhlIGNvZGVcbiAgICAgICAgICBzb3VyY2VNYXA6IHRydWUsIC8vIE9wdGlvbmFsOiBJbmNsdWRlIHNvdXJjZSBtYXBzXG4gICAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbXCJhd3Mtc2RrXCJdLCAvLyBFeGNsdWRlIEFXUyBTREsgZnJvbSB0aGUgYnVuZGxlIChpdCdzIGF2YWlsYWJsZSBpbiB0aGUgTGFtYmRhIHJ1bnRpbWUpXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGdldFByb2R1Y3RCeUlkTGFtYmRhID0gbmV3IGxhbWJkYU5vZGVqcy5Ob2RlanNGdW5jdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBcIkdldFByb2R1Y3RCeUlkTGFtYmRhXCIsXG4gICAgICB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18yMF9YLCAvLyBVc2UgTm9kZS5qcyAyMC54IHJ1bnRpbWVcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vbGliL2xhbWJkYS9nZXRQcm9kdWN0QnlJZC9pbmRleC50c1wiKSxcbiAgICAgICAgaGFuZGxlcjogXCJoYW5kbGVyXCIsIC8vIEVudHJ5IHBvaW50IG9mIHRoZSBMYW1iZGEgZnVuY3Rpb25cbiAgICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgICBmb3JjZURvY2tlckJ1bmRsaW5nOiBmYWxzZSwgLy8gRW5zdXJlIERvY2tlciBpcyBub3QgdXNlZFxuICAgICAgICAgIG1pbmlmeTogdHJ1ZSwgLy8gT3B0aW9uYWw6IE1pbmlmeSB0aGUgY29kZVxuICAgICAgICAgIHNvdXJjZU1hcDogdHJ1ZSwgLy8gT3B0aW9uYWw6IEluY2x1ZGUgc291cmNlIG1hcHNcbiAgICAgICAgICBleHRlcm5hbE1vZHVsZXM6IFtcImF3cy1zZGtcIl0sIC8vIEV4Y2x1ZGUgQVdTIFNESyBmcm9tIHRoZSBidW5kbGUgKGl0J3MgYXZhaWxhYmxlIGluIHRoZSBMYW1iZGEgcnVudGltZSlcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0T3BlbkFwaUpzb25MYW1iZGEgPSBuZXcgbGFtYmRhTm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIFwiR2V0T3BlbkFwaUpzb25MYW1iZGFcIixcbiAgICAgIHtcbiAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsIC8vIFVzZSBOb2RlLmpzIDIwLnggcnVudGltZVxuICAgICAgICBlbnRyeTogcGF0aC5qb2luKFxuICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICBcIi4uL2xpYi9sYW1iZGEvZG9jdW1lbnRhdGlvbi9nZXRPcGVuQXBpSnNvbi50c1wiXG4gICAgICAgICksXG4gICAgICAgIGhhbmRsZXI6IFwiaGFuZGxlclwiLCAvLyBFbnRyeSBwb2ludCBvZiB0aGUgTGFtYmRhIGZ1bmN0aW9uXG4gICAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgICAgZm9yY2VEb2NrZXJCdW5kbGluZzogZmFsc2UsIC8vIEVuc3VyZSBEb2NrZXIgaXMgbm90IHVzZWRcbiAgICAgICAgICBtaW5pZnk6IHRydWUsIC8vIE9wdGlvbmFsOiBNaW5pZnkgdGhlIGNvZGVcbiAgICAgICAgICBzb3VyY2VNYXA6IHRydWUsIC8vIE9wdGlvbmFsOiBJbmNsdWRlIHNvdXJjZSBtYXBzXG4gICAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbXCJhd3Mtc2RrXCJdLCAvLyBFeGNsdWRlIEFXUyBTREsgZnJvbSB0aGUgYnVuZGxlIChpdCdzIGF2YWlsYWJsZSBpbiB0aGUgTGFtYmRhIHJ1bnRpbWUpXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGdldFN3YWdnZXJMYW1iZGEgPSBuZXcgbGFtYmRhTm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIFwiR2V0U3dhZ2dlckxhbWJkYVwiLFxuICAgICAge1xuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCwgLy8gVXNlIE5vZGUuanMgMjAueCBydW50aW1lXG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgIFwiLi4vbGliL2xhbWJkYS9kb2N1bWVudGF0aW9uL2dldFN3YWdnZXIudHNcIlxuICAgICAgICApLFxuICAgICAgICBoYW5kbGVyOiBcImhhbmRsZXJcIiwgLy8gRW50cnkgcG9pbnQgb2YgdGhlIExhbWJkYSBmdW5jdGlvblxuICAgICAgICBidW5kbGluZzoge1xuICAgICAgICAgIGZvcmNlRG9ja2VyQnVuZGxpbmc6IGZhbHNlLCAvLyBFbnN1cmUgRG9ja2VyIGlzIG5vdCB1c2VkXG4gICAgICAgICAgbWluaWZ5OiB0cnVlLCAvLyBPcHRpb25hbDogTWluaWZ5IHRoZSBjb2RlXG4gICAgICAgICAgc291cmNlTWFwOiB0cnVlLCAvLyBPcHRpb25hbDogSW5jbHVkZSBzb3VyY2UgbWFwc1xuICAgICAgICAgIGV4dGVybmFsTW9kdWxlczogW1wiYXdzLXNka1wiXSwgLy8gRXhjbHVkZSBBV1MgU0RLIGZyb20gdGhlIGJ1bmRsZSAoaXQncyBhdmFpbGFibGUgaW4gdGhlIExhbWJkYSBydW50aW1lKVxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBEZWZpbmUgdGhlIEFQSSBHYXRld2F5XG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCBcIlByb2R1Y3RTZXJ2aWNlQXBpXCIsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiBcIlByb2R1Y3QgU2VydmljZSBBUElcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgc2VydmljZSBoYW5kbGVzIHByb2R1Y3QtcmVsYXRlZCBvcGVyYXRpb25zLlwiLFxuICAgICAgZGVwbG95T3B0aW9uczoge1xuICAgICAgICBzdGFnZU5hbWU6IFwiZGV2XCIsIC8vIFNldCB0aGUgc3RhZ2UgbmFtZVxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWdhdGV3YXkuQ29ycy5BTExfT1JJR0lOUyxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBhcGlnYXRld2F5LkNvcnMuQUxMX01FVEhPRFMsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gR0VUIC9wcm9kdWN0c1xuICAgIGNvbnN0IHByb2R1Y3RSZXNvdXJjZSA9IGFwaS5yb290LmFkZFJlc291cmNlKFwicHJvZHVjdFwiKTtcbiAgICAvLyBHRVQgL3Byb2R1Y3QvYXZhaWxhYmxlXG4gICAgY29uc3QgYXZhaWxhYmxlUmVzb3VyY2UgPSBwcm9kdWN0UmVzb3VyY2UuYWRkUmVzb3VyY2UoXCJhdmFpbGFibGVcIik7XG5cbiAgICBhdmFpbGFibGVSZXNvdXJjZS5hZGRNZXRob2QoXG4gICAgICBcIkdFVFwiLFxuICAgICAgbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oZ2V0UHJvZHVjdHNMaXN0TGFtYmRhKSxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbeyBzdGF0dXNDb2RlOiBcIjIwMFwiIH1dLFxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBHRVQgL3Byb2R1Y3RzL3twcm9kdWN0SWR9XG4gICAgY29uc3QgcHJvZHVjdEJ5SWRSZXNvdXJjZSA9IHByb2R1Y3RSZXNvdXJjZS5hZGRSZXNvdXJjZShcIntwcm9kdWN0SWR9XCIpO1xuICAgIHByb2R1Y3RCeUlkUmVzb3VyY2UuYWRkTWV0aG9kKFxuICAgICAgXCJHRVRcIixcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldFByb2R1Y3RCeUlkTGFtYmRhKSxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbXG4gICAgICAgICAgeyBzdGF0dXNDb2RlOiBcIjIwMFwiIH0sXG4gICAgICAgICAgeyBzdGF0dXNDb2RlOiBcIjQwMFwiIH0sXG4gICAgICAgICAgeyBzdGF0dXNDb2RlOiBcIjQwNFwiIH0sXG4gICAgICAgICAgeyBzdGF0dXNDb2RlOiBcIjUwMFwiIH0sXG4gICAgICAgIF0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIGRvY3MgLSBHRVQgc3dhZ2dlciBhbmQgb3BlbkFwaVxuICAgIGNvbnN0IG9wZW5BcGlKc29uUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShcIm9wZW5hcGkuanNvblwiKTtcblxuICAgIG9wZW5BcGlKc29uUmVzb3VyY2UuYWRkTWV0aG9kKFxuICAgICAgXCJHRVRcIixcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldE9wZW5BcGlKc29uTGFtYmRhKSxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbeyBzdGF0dXNDb2RlOiBcIjIwMFwiIH1dLFxuICAgICAgfVxuICAgICk7XG4gICAgY29uc3Qgc3dhZ2dlclJlc291cmNlID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoXCJzd2FnZ2VyXCIpO1xuXG4gICAgc3dhZ2dlclJlc291cmNlLmFkZE1ldGhvZChcbiAgICAgIFwiR0VUXCIsXG4gICAgICBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihnZXRTd2FnZ2VyTGFtYmRhKSxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbeyBzdGF0dXNDb2RlOiBcIjIwMFwiIH1dLFxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIEFQSSBHYXRld2F5IFVSTFxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiQXBpVXJsXCIsIHtcbiAgICAgIHZhbHVlOiBhcGkudXJsLFxuICAgICAgZGVzY3JpcHRpb246IFwiVGhlIFVSTCBvZiB0aGUgUHJvZHVjdCBTZXJ2aWNlIEFQSVwiLFxuICAgIH0pO1xuICB9XG59XG4iXX0=