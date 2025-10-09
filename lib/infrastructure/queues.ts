import * as cdk from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

/**
 * Creates and configures SQS queues for the messaging infrastructure
 */
export class QueueInfrastructure {
  public readonly catalogItemsQueue: sqs.Queue;
  public readonly deadLetterQueue: sqs.Queue;

  constructor(scope: Construct) {
    // Dead Letter Queue for failed messages
    this.deadLetterQueue = new sqs.Queue(scope, "DLQ", {
      queueName: "catalog-items-dlq",
      retentionPeriod: cdk.Duration.days(14), // Retain failed messages for 14 days
    });

    // Main catalog items queue with DLQ configuration
    this.catalogItemsQueue = new sqs.Queue(scope, "CatalogItemsQueue", {
      queueName: "catalog-items-queue", 
      visibilityTimeout: cdk.Duration.seconds(30), // Lambda processing timeout
      retentionPeriod: cdk.Duration.days(4), // Keep messages for 4 days
      deadLetterQueue: {
        queue: this.deadLetterQueue,
        maxReceiveCount: 3, // Retry failed messages 3 times before sending to DLQ
      },
    });
  }

  /**
   * Get the queue URL for environment variables
   */
  get queueUrl(): string {
    return this.catalogItemsQueue.queueUrl;
  }

  /**
   * Get the queue ARN for permissions
   */
  get queueArn(): string {
    return this.catalogItemsQueue.queueArn;
  }
}