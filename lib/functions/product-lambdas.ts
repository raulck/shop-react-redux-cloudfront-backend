import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";
import { Construct } from "constructs";
import { LambdaConfig } from "../config/lambda-config";
import { DatabaseTables } from "../infrastructure/database";

/**
 * Creates and configures all Lambda functions for the product service
 */
export class ProductServiceLambdas {
  public readonly getProductsListLambda: lambdaNodejs.NodejsFunction;
  public readonly getProductByIdLambda: lambdaNodejs.NodejsFunction;
  public readonly createProductLambda: lambdaNodejs.NodejsFunction;
  public readonly updateProductLambda: lambdaNodejs.NodejsFunction;
  public readonly getOpenApiJsonLambda: lambdaNodejs.NodejsFunction;
  public readonly getSwaggerLambda: lambdaNodejs.NodejsFunction;

  constructor(
    scope: Construct,
    database: DatabaseTables
  ) {
    const dbEnvironment = database.getEnvironmentVariables();

    // Product CRUD operations
    this.getProductsListLambda = this.createLambdaFunction(
      scope,
      "GetProductsListLambda",
      "../lambdas/products/getProductsList.ts",
      LambdaConfig.READ_OPERATIONS,
      dbEnvironment
    );

    this.getProductByIdLambda = this.createLambdaFunction(
      scope,
      "GetProductByIdLambda",
      "../lambdas/products/getProductById.ts",
      LambdaConfig.READ_OPERATIONS,
      dbEnvironment
    );

    this.createProductLambda = this.createLambdaFunction(
      scope,
      "CreateProductLambda",
      "../lambdas/products/createProduct.ts",
      LambdaConfig.WRITE_OPERATIONS,
      dbEnvironment
    );

    this.updateProductLambda = this.createLambdaFunction(
      scope,
      "UpdateProductLambda",
      "../lambdas/products/updateProduct.ts",
      LambdaConfig.WRITE_OPERATIONS,
      dbEnvironment
    );

    // Documentation endpoints
    this.getOpenApiJsonLambda = this.createLambdaFunction(
      scope,
      "GetOpenApiJsonLambda",
      "../lambdas/documentation/getOpenApiJson.ts",
      LambdaConfig.STATIC_CONTENT
    );

    this.getSwaggerLambda = this.createLambdaFunction(
      scope,
      "GetSwaggerLambda",
      "../lambdas/documentation/getSwagger.ts",
      LambdaConfig.STATIC_CONTENT
    );

    // Grant database permissions
    this.grantDatabasePermissions(database);
  }

  /**
   * Helper method to create a lambda function with consistent configuration
   */
  private createLambdaFunction(
    scope: Construct,
    name: string,
    entryPath: string,
    config: any,
    environment?: Record<string, string>
  ): lambdaNodejs.NodejsFunction {
    return new lambdaNodejs.NodejsFunction(scope, name, {
      ...config,
      entry: path.join(__dirname, entryPath),
      handler: "handler",
      environment,
    });
  }

  /**
   * Grant appropriate database permissions to lambda functions
   */
  private grantDatabasePermissions(database: DatabaseTables) {
    // Read permissions for query operations
    const readLambdas = [this.getProductsListLambda, this.getProductByIdLambda];
    readLambdas.forEach((lambda) => database.grantReadAccess(lambda));

    // Write permissions for mutation operations
    const writeLambdas = [
      this.createProductLambda,
      this.updateProductLambda,
    ];
    writeLambdas.forEach((lambda) => database.grantWriteAccess(lambda));
  }

  /**
   * Get all lambdas that need read access
   */
  getReadLambdas(): lambdaNodejs.NodejsFunction[] {
    return [this.getProductsListLambda, this.getProductByIdLambda];
  }

  /**
   * Get all lambdas that need write access
   */
  getWriteLambdas(): lambdaNodejs.NodejsFunction[] {
    return [
      this.createProductLambda,
      this.updateProductLambda,
    ];
  }
}