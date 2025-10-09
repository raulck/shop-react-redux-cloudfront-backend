import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as path from "path";

interface ImportServiceStackProps extends cdk.StackProps {
  // Add future props here if needed
}

export class ImportServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: ImportServiceStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "ImportBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.GET],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
          exposedHeaders: ["ETag"],
        },
      ],
    });

    new s3deploy.BucketDeployment(this, "CreateUploadedPrefix", {
      destinationBucket: bucket,
      sources: [
        s3deploy.Source.data("uploaded/placeholder.txt", "placeholder"),
      ],
    });

    const importProductsFileLambda = new lambdaNode.NodejsFunction(
      this,
      "importProductsFileLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          "../lib/lambdas/import/importProductsFile.ts"
        ),
        handler: "handler",
        memorySize: 128, // Simple S3 signed URL generation
        timeout: cdk.Duration.seconds(10), // Quick timeout
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
        environment: {
          BUCKET_NAME: bucket.bucketName,
        },
      }
    );

    bucket.grantPut(importProductsFileLambda, "uploaded/*");

    const api = new apigateway.RestApi(this, "ImportServiceApi", {
      restApiName: "Import Service API",
      description: "API for importing product files",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
      deployOptions: { stageName: "dev" },
    });

    const importFileParserLambda = new lambdaNode.NodejsFunction(
      this,
      "importFileParserLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          "../lib/lambdas/import/importFileParser.ts"
        ),
        handler: "handler",
        memorySize: 512, // More memory for CSV parsing + SQS writes
        timeout: cdk.Duration.seconds(60), // Longer timeout for file processing
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
        environment: {
          BUCKET_NAME: bucket.bucketName,
        },
      }
    );

    bucket.grantRead(importFileParserLambda, "uploaded/*");
    bucket.grantDelete(importFileParserLambda, "uploaded/*");
    bucket.grantPut(importFileParserLambda, "parsed/*");

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(importFileParserLambda),
      { prefix: "uploaded/", suffix: ".csv" }
    );

    const importResource = api.root.addResource("import");
    importResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(importProductsFileLambda),
      {
        methodResponses: [{ statusCode: "200" }],
      }
    );
  }
}
