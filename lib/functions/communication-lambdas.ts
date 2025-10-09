import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";
import { DatabaseTables } from "../infrastructure/database";
import { NotificationInfrastructure } from "../infrastructure/notifications";

/**
 * Creates and configures Lambda functions for communication and messaging
 */
export class CommunicationLambdas {
  public readonly catalogBatchProcessLambda: lambdaNodejs.NodejsFunction;

  constructor(
    scope: Construct,
    database: DatabaseTables,
    notifications: NotificationInfrastructure
  ) {
    this.catalogBatchProcessLambda = this.createCatalogBatchProcessLambda(
      scope,
      database,
      notifications
    );
  }

  /**
   * Create the catalogBatchProcess lambda function
   */
  private createCatalogBatchProcessLambda(
    scope: Construct,
    database: DatabaseTables,
    notifications: NotificationInfrastructure
  ): lambdaNodejs.NodejsFunction {
    const catalogBatchProcessLambda = new lambdaNodejs.NodejsFunction(scope, "CatalogBatchProcessLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "../lambdas/communication/catalogBatchProcess.ts"),
      handler: "handler",
      memorySize: 256, // More memory for batch processing
      timeout: cdk.Duration.seconds(30), // Batch processing timeout
      bundling: {
        forceDockerBundling: false,
        minify: true,
        sourceMap: true,
        externalModules: ["aws-sdk"],
      },
      environment: {
        PRODUCTS_TABLE: database.productsTable.tableName,
        STOCK_TABLE: database.stockTable.tableName,
        CREATE_PRODUCT_TOPIC_ARN: notifications.topicArn,
      },
    });

    // Grant database permissions
    database.grantWriteAccess(catalogBatchProcessLambda);
    
    // Grant SNS publish permissions
    notifications.createProductTopic.grantPublish(catalogBatchProcessLambda);

    return catalogBatchProcessLambda;
  }
}