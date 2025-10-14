import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";

/**
 * Common configuration shared across all lambda functions
 */
const COMMON_CONFIG = {
  runtime: lambda.Runtime.NODEJS_20_X,
  bundling: {
    forceDockerBundling: false,
    minify: true,
    sourceMap: true,
    externalModules: ["aws-sdk"],
  },
} as const;

/**
 * Memory and timeout configurations for different operation types
 */
const PERFORMANCE_CONFIGS = {
  LIGHTWEIGHT: {
    memorySize: 128,
    timeout: cdk.Duration.seconds(5),
  },
  STANDARD_READ: {
    memorySize: 128,
    timeout: cdk.Duration.seconds(10),
  },
  STANDARD_WRITE: {
    memorySize: 256,
    timeout: cdk.Duration.seconds(15),
  },
  BATCH_PROCESSING: {
    memorySize: 256,
    timeout: cdk.Duration.seconds(30),
  },
  FILE_PROCESSING: {
    memorySize: 512,
    timeout: cdk.Duration.seconds(60),
  },
} as const;

/**
 * Helper function to create lambda configuration
 */
const createLambdaConfig = (performance: keyof typeof PERFORMANCE_CONFIGS) => ({
  ...COMMON_CONFIG,
  ...PERFORMANCE_CONFIGS[performance],
});

/**
 * Standard lambda configuration presets for consistent performance and cost optimization
 */
export const LambdaConfig = {
  /**
   * Configuration for simple read operations (GET requests, database reads)
   */
  READ_OPERATIONS: createLambdaConfig('STANDARD_READ'),

  /**
   * Configuration for write operations (POST, PUT requests with DynamoDB)
   */
  WRITE_OPERATIONS: createLambdaConfig('STANDARD_WRITE'),

  /**
   * Configuration for batch processing operations (SQS message processing)
   */
  BATCH_PROCESSING: createLambdaConfig('BATCH_PROCESSING'),

  /**
   * Configuration for file processing operations (CSV parsing, file uploads)
   */
  FILE_PROCESSING: createLambdaConfig('FILE_PROCESSING'),

  /**
   * Configuration for static content operations (documentation, simple responses)
   */
  STATIC_CONTENT: createLambdaConfig('LIGHTWEIGHT'),

  /**
   * Configuration for simple S3 operations (signed URLs, simple file operations)
   */
  S3_OPERATIONS: createLambdaConfig('STANDARD_READ'),
} as const;