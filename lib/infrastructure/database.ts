import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

/**
 * Creates and configures DynamoDB tables for the product service
 */
export class DatabaseTables {
  public readonly productsTable: dynamodb.Table;
  public readonly stockTable: dynamodb.Table;

  constructor(scope: Construct) {
    // Products table - stores product information
    this.productsTable = new dynamodb.Table(scope, "ProductsTable", {
      tableName: "products",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Stock table - stores inventory information
    this.stockTable = new dynamodb.Table(scope, "StockTable", {
      tableName: "stock",
      partitionKey: { name: "product_id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }

  /**
   * Grant read permissions to a lambda function
   */
  grantReadAccess(lambda: any) {
    this.productsTable.grantReadData(lambda);
    this.stockTable.grantReadData(lambda);
  }

  /**
   * Grant write permissions to a lambda function
   */
  grantWriteAccess(lambda: any) {
    this.productsTable.grantWriteData(lambda);
    this.stockTable.grantWriteData(lambda);
  }

  /**
   * Get environment variables for lambda functions
   */
  getEnvironmentVariables() {
    return {
      PRODUCTS_TABLE: this.productsTable.tableName,
      STOCK_TABLE: this.stockTable.tableName,
    };
  }
}