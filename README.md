# React-shop-cloudfront - backend

## CloudX: AWS Practitioner for JS

### Assignment 5 - Integration with S3

#### Tasks - what was done

- ImportServiceStack was created and repository structure updated (import-service-stack.ts added) in lib folder
- S3 bucket was defined and deployed in ImportServiceStack with an 'uploaded' folder
- Lambda function importProductsFile was created and integrated with API Gateway at GET /import
- Function returned a [Signed URL with query param](https://u7trhc85wh.execute-api.eu-north-1.amazonaws.com/dev/import?name=test.csv) with query param
- ImportServiceStack was updated with IAM policies and Frontend api path for import was updated
- Lambda function importFileParser was created and configured to trigger on s3:ObjectCreated events for objects in the 'uploaded' folder and on stream end moved to parsed folder
- import file parser is logged in CloudWatch
- importProductsFile lambda is covered by unit tests

- ESBuild configured for product service, basic tests implemented, code separated, main error scenarios handled

##### Frontend

- [My shop app](https://d1kq5q0usw740u.cloudfront.net)

##### Backend

- available through url - [Products list](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/products)

- available through url - [Product by id](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/products/f1e29929-44cf-400a-b9bf-edcb050e32ab)
- error message for not available id - [Product by id error](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/products/99)

- [BE - import service url](https://u7trhc85wh.execute-api.eu-north-1.amazonaws.com/dev/)
- [BE - product service url](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/)

- swagger - [https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/swagger](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/swagger)

##

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
