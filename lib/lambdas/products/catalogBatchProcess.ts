import { SQSEvent } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const dbClient = new DynamoDBClient({});
const snsClient = new SNSClient({});
const productsTable = process.env.PRODUCTS_TABLE!;
const stockTable = process.env.STOCK_TABLE!;
const snsTopicArn = process.env.SNS_TOPIC_ARN!;

export const handler = async (event: SQSEvent) => {
  const { v4: uuidv4 } = await import('uuid');
  console.log('SQSEvent records count:', event.Records.length);

  for (const record of event.Records) {
    try {
      console.log('Processing record:', record.messageId);
      console.log('Raw record body:', record.body);
      
      const product = JSON.parse(record.body);
      
      const id = product.id || uuidv4();
      const count = parseInt(product.count) || 0;
      
      // Validate required fields
      if (!product.title || !product.description || !product.price) {
        console.error('Missing required fields in product:', product);
        continue;
      }

      console.log('Creating product:', product);
      console.log('Stock count:', count);

      // Create product entry
      await dbClient.send(new PutItemCommand({
        TableName: productsTable,
        Item: {
          id: { S: id },
          title: { S: product.title.toString() },
          description: { S: product.description.toString() },
          price: { N: (product.price || 0).toString() },
        }
      }));

      // Create stock entry
      await dbClient.send(new PutItemCommand({
        TableName: stockTable,
        Item: {
          product_id: { S: id },
          count: { N: count.toString() },
        }
      }));

      console.log('Successfully created product and stock for ID:', id);

      await snsClient.send(new PublishCommand({
        TopicArn: snsTopicArn,
        Message: JSON.stringify({ ...product, id, count }),
        Subject: 'New product created',
      }));
      
    } catch (error) {
      console.error('Failed to parse or process message', record.messageId, ':', error);
      console.error('Message body was:', record.body);
      // Don't throw - let this record fail and continue with others
    }
  }

  return { statusCode: 200, body: 'Batch processed' };
};