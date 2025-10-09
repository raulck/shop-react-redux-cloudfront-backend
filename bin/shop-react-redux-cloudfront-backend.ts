#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ProductServiceStack } from "../lib/product-service-stack";
import { ImportServiceStack } from "../lib/import-service-stack";

const app = new cdk.App();

// Create ProductServiceStack first to get the SQS queue URL
const productServiceStack = new ProductServiceStack(app, "ProductServiceStack", {});

// Create ImportServiceStack with the SQS queue URL from ProductServiceStack
new ImportServiceStack(app, "ImportServiceStack", {
  catalogItemsQueueUrl: productServiceStack.catalogItemsQueueUrl,
});
