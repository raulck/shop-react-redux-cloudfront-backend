import * as cdk from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";

/**
 * Creates and configures SNS topics and subscriptions for notifications
 */
export class NotificationInfrastructure {
  public readonly createProductTopic: sns.Topic;

  constructor(scope: Construct) {
    // SNS Topic for product creation notifications
    this.createProductTopic = new sns.Topic(scope, "CreateProductTopic", {
      topicName: "create-product-topic",
      displayName: "Product Creation Notifications",
    });

    // Add email subscriptions
    this.setupEmailSubscriptions();
  }

  /**
   * Setup email subscriptions with filtering
   */
  private setupEmailSubscriptions() {
    // General email subscription for all product notifications
    const generalEmail = "general@example.com"; // Replace with actual email address
    this.createProductTopic.addSubscription(
      new subs.EmailSubscription(generalEmail)
    );

    // Filtered email subscription for specific categories
    const filteredEmail = "filtered@example.com"; // Replace with actual email
    this.createProductTopic.addSubscription(
      new subs.EmailSubscription(filteredEmail, {
        filterPolicy: {
          // Filter based on the 'category' attribute
          category: sns.SubscriptionFilter.stringFilter({
            allowlist: ["electronics", "furniture"], // Accept specific categories
          }),
        },
      })
    );
  }

  /**
   * Get the topic ARN for publishing
   */
  get topicArn(): string {
    return this.createProductTopic.topicArn;
  }
}