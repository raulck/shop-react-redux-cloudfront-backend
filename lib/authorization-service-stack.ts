import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as logs from "aws-cdk-lib/aws-logs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export class AuthorizationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authorizationLambda = new lambdaNodejs.NodejsFunction(
      this,
      "BasicAuthorizerFn",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          "../lib/lambdas/authorization/basicAuthorizer.ts"
        ),
        handler: "handler",
        bundling: {
          forceDockerBundling: false, // Ensure Docker is not used
          minify: true, // Optional: Minify the code
          sourceMap: true, // Optional: Include source maps
          externalModules: ["aws-sdk"], // Exclude AWS SDK from the bundle (it's available in the Lambda runtime)
        },
        logRetention: logs.RetentionDays.ONE_DAY,
        environment: {
          // Using credentials from .env file
          [process.env.AUTH_USERNAME!]: process.env.AUTH_PASSWORD!,
        },
      }
    );

    authorizationLambda.addPermission("ApiGatewayInvokePermission", {
      principal: new iam.ServicePrincipal("apigateway.amazonaws.com"),
    });

    new cdk.CfnOutput(this, "BasicAuthorizerArn", {
      value: authorizationLambda.functionArn,
      exportName: "BasicAuthorizerArn",
    });
  }
}
