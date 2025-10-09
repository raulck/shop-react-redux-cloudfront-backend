import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ProductServiceLambdas } from "../functions/product-lambdas";

const methodResponse = {
    methodResponses: [
        { statusCode: "200" },
        { statusCode: "400" },
        { statusCode: "404" },
        { statusCode: "500" },
    ],
};
/**
 * Creates and configures the API Gateway for the product service
 */
export class ProductServiceApi {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, lambdas: ProductServiceLambdas) {
    // Create the main API Gateway
    this.api = new apigateway.RestApi(scope, "ProductServiceApi", {
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

    // Set up API routes
    this.setupProductRoutes(lambdas);
    this.setupDocumentationRoutes(lambdas);
  }

  /**
   * Configure product-related API routes
   */
  private setupProductRoutes(lambdas: ProductServiceLambdas) {
    // Define /products resource
    const productResource = this.api.root.addResource("products");

    // GET /products - List all products with stock information
    productResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdas.getProductsListLambda),
      {
        methodResponses: [{ statusCode: "200" }, { statusCode: "500" }],
      }
    );

    // POST /products - Create new product
    productResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdas.createProductLambda),
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
      new apigateway.LambdaIntegration(lambdas.getProductByIdLambda), methodResponse
    );

    // PUT /products/{productId}
    productByIdResource.addMethod(
      "PUT",
      new apigateway.LambdaIntegration(lambdas.updateProductLambda),
      methodResponse
    );
  }

  /**
   * Configure documentation-related API routes
   */
  private setupDocumentationRoutes(lambdas: ProductServiceLambdas) {
    // GET /openapi.json - OpenAPI specification
    const openApiJsonResource = this.api.root.addResource("openapi.json");
    openApiJsonResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdas.getOpenApiJsonLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );

    // GET /swagger - Swagger UI
    const swaggerResource = this.api.root.addResource("swagger");
    swaggerResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdas.getSwaggerLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );
  }
}