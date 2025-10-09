import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { SQSEvent, SQSRecord } from "aws-lambda";

const { v4: uuidv4 } = require("uuid");

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const snsClient = new SNSClient({});

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
const STOCK_TABLE = process.env.STOCK_TABLE;
const CREATE_PRODUCT_TOPIC_ARN = process.env.CREATE_PRODUCT_TOPIC_ARN;

interface ProductData {
  title: string;
  description: string;
  price: number;
  count: number;
  category?: string;
}

interface SNSMessage {
  Records: Array<{
    Sns: {
      Message: string;
    };
  }>;
}

export const handler = async (event: SQSEvent) => {
  console.log('Processing SQS event:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    try {
      await processRecord(record);
    } catch (error) {
      console.error('Error processing record:', error);
      console.error('Failed record:', JSON.stringify(record, null, 2));
      throw error; // Re-throw to trigger DLQ behavior
    }
  }
};

async function processRecord(record: SQSRecord) {
  let productData: ProductData;

  try {
    // Check if this is an SNS-wrapped message
    if (record.body.includes('"Type":"Notification"')) {
      const snsMessage: SNSMessage = JSON.parse(record.body);
      productData = JSON.parse(snsMessage.Records[0].Sns.Message);
    } else {
      // Direct SQS message
      productData = JSON.parse(record.body);
    }

    console.log('Parsed product data:', productData);
  } catch (error) {
    console.error('Failed to parse message body:', record.body);
    throw new Error(`Invalid message format: ${error}`);
  }

  // Validate required fields
  if (!productData.title || productData.price === undefined || productData.count === undefined) {
    throw new Error(`Missing required fields in product data: ${JSON.stringify(productData)}`);
  }

  const productId = uuidv4();
  const timestamp = new Date().toISOString();

  // Prepare DynamoDB items
  const productItem = {
    id: productId,
    title: productData.title,
    description: productData.description || '',
    price: Number(productData.price),
    created_at: timestamp,
    updated_at: timestamp,
  };

  const stockItem = {
    product_id: productId,
    count: Number(productData.count),
    created_at: timestamp,
    updated_at: timestamp,
  };

  try {
    // Use transaction to ensure data consistency
    await docClient.send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: PRODUCTS_TABLE,
            Item: productItem,
            ConditionExpression: 'attribute_not_exists(id)', // Prevent duplicates
          },
        },
        {
          Put: {
            TableName: STOCK_TABLE,
            Item: stockItem,
            ConditionExpression: 'attribute_not_exists(product_id)', // Prevent duplicates
          },
        },
      ],
    }));

    console.log(`Successfully created product: ${productId} - ${productData.title}`);

    // Send SNS notification for successful product creation
    if (CREATE_PRODUCT_TOPIC_ARN) {
      await sendProductCreationNotification(productItem, productData.category);
    }

  } catch (error) {
    console.error('Failed to save product to DynamoDB:', error);
    throw error;
  }
}

async function sendProductCreationNotification(product: any, category?: string) {
  try {
    const message = {
      productId: product.id,
      title: product.title,
      price: product.price,
      timestamp: product.created_at,
    };

    const publishParams: any = {
      TopicArn: CREATE_PRODUCT_TOPIC_ARN,
      Message: JSON.stringify(message),
      Subject: `New Product Created: ${product.title}`,
    };

    // Add category as message attribute for filtering
    if (category) {
      publishParams.MessageAttributes = {
        category: {
          DataType: 'String',
          StringValue: category,
        },
      };
    }

    await snsClient.send(new PublishCommand(publishParams));
    console.log(`SNS notification sent for product: ${product.id}`);
  } catch (error) {
    console.error('Failed to send SNS notification:', error);
  }
}