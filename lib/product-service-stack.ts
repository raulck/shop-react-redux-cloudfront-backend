import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { DatabaseTables } from "./infrastructure/database";
import { QueueInfrastructure } from "./infrastructure/queues";
import { NotificationInfrastructure } from "./infrastructure/notifications";
import { ProductServiceLambdas } from "./functions/product-lambdas";
import { CommunicationLambdas } from "./functions/communication-lambdas";
import { ProductServiceApi } from "./api/product-api";

/**
 * Main Product Service Stack - orchestrates all components
 * 
 * This stack provides:
 * - DynamoDB tables for products and stock
 * - SQS queues for batch processing
 * - SNS topics for notifications
 * - Lambda functions for all operations including batch processing
 * - API Gateway for REST endpoints
 * - Proper permissions and integrations
 */
export class ProductServiceStack extends cdk.Stack {
  public readonly productsTable: dynamodb.Table;
  public readonly stockTable: dynamodb.Table;
  public readonly apiUrl: string;
  public readonly catalogItemsQueueUrl: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create infrastructure components
    const database = new DatabaseTables(this);
    const queues = new QueueInfrastructure(this);
    const notifications = new NotificationInfrastructure(this);
    
    // Create communication lambdas
    const communicationLambdas = new CommunicationLambdas(this, database, notifications);
    
    // Connect SQS queue to lambda
    communicationLambdas.catalogBatchProcessLambda.addEventSource(
      new SqsEventSource(queues.catalogItemsQueue, { 
        batchSize: 5, // Process up to 5 messages at a time
        reportBatchItemFailures: true, // Enable partial batch failure reporting
      })
    );
    
    // Create lambda functions
    const lambdas = new ProductServiceLambdas(this, database);
    
    // Create API Gateway
    const apiService = new ProductServiceApi(this, lambdas);

    // Expose public properties for other stacks
    this.productsTable = database.productsTable;
    this.stockTable = database.stockTable;
    this.apiUrl = apiService.api.url;
    this.catalogItemsQueueUrl = queues.queueUrl;

    // Create stack outputs
    this.createOutputs(apiService.api, database, queues);
  }



  /**
   * Create CloudFormation outputs for external reference
   */
  private createOutputs(api: any, database: DatabaseTables, queues?: QueueInfrastructure) {
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

    // SQS Queue URL output if queues are provided
    if (queues) {
      new cdk.CfnOutput(this, "CatalogItemsQueueUrl", {
        value: queues.queueUrl,
        description: "URL of the Catalog Items SQS Queue",
      });
    }
  }
}