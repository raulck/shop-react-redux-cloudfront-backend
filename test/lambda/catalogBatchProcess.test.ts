import { SQSEvent, SQSRecord } from 'aws-lambda';
import { handler } from '../../lib/lambdas/products/catalogBatchProcess';

// Mock AWS SDK clients
jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: jest.fn(() => ({
    send: jest.fn().mockResolvedValue({})
  })),
  PutItemCommand: jest.fn()
}));

jest.mock('@aws-sdk/client-sns', () => ({
  SNSClient: jest.fn(() => ({
    send: jest.fn().mockResolvedValue({})
  })),
  PublishCommand: jest.fn()
}));

// Mock UUID
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-123')
}));

// Set up environment variables
process.env.PRODUCTS_TABLE = 'test-products-table';
process.env.SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:123456789012:test-topic';

describe('catalogBatchProcess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process SQS records successfully', async () => {
    const mockSQSEvent: SQSEvent = {
      Records: [
        {
          body: JSON.stringify({
            title: 'Test Product',
            description: 'Test Description',
            price: 99.99
          }),
          messageId: 'test-message-id',
          receiptHandle: 'test-receipt-handle',
          attributes: {},
          messageAttributes: {},
          md5OfBody: 'test-md5',
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:us-east-1:123456789012:test-queue',
          awsRegion: 'us-east-1'
        } as SQSRecord
      ]
    };

    const result = await handler(mockSQSEvent);

    expect(result).toEqual({
      statusCode: 200,
      body: 'Batch processed'
    });
  });

  it('should handle empty records', async () => {
    const mockSQSEvent: SQSEvent = {
      Records: []
    };

    const result = await handler(mockSQSEvent);

    expect(result).toEqual({
      statusCode: 200,
      body: 'Batch processed'
    });
  });
});