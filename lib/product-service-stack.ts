import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { DatabaseTables } from "./infrastructure/database";
import { ProductServiceLambdas } from "./functions/product-lambdas";
import { ProductServiceApi } from "./api/product-api";

/**
 * Main Product Service Stack - orchestrates all components
 * 
 * This stack provides:
 * - DynamoDB tables for products and stock
 * - SQS queues for batch processing
 * - Lambda functions for all operations
 * - API Gateway for REST endpoints
 * - Proper permissions and integrations
 */
export class ProductServiceStack extends cdk.Stack {
  public readonly productsTable: dynamodb.Table;
  public readonly stockTable: dynamodb.Table;
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create database infrastructure
    const database = new DatabaseTables(this);
    
    // Create lambda functions
    const lambdas = new ProductServiceLambdas(this, database);
    
    // Create API Gateway
    const apiService = new ProductServiceApi(this, lambdas);

    // Expose public properties for other stacks
    this.productsTable = database.productsTable;
    this.stockTable = database.stockTable;
    this.apiUrl = apiService.api.url;

    // Create stack outputs
    this.createOutputs(apiService.api, database);
  }

  /**
   * Create CloudFormation outputs for external reference
   */
  private createOutputs(api: any, database: DatabaseTables) {
    // API Gateway URL output
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "The URL of the Product Service API",
    });

    // DynamoDB table names for easier reference
    new cdk.CfnOutput(this, "ProductsTableName", {
      value: database.productsTable.tableName,
      description: "Name of the Products DynamoDB table",
    });

    new cdk.CfnOutput(this, "StockTableName", {
      value: database.stockTable.tableName,
      description: "Name of the Stock DynamoDB table",
    });
  }
}