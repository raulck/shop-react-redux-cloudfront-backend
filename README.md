# React-shop-cloudfront - backend

## CloudX: AWS Practitioner for JS

### Assignment 3 – Serverless

#### Tasks

- created lambda function getProductsList
- available through url - [Products list](https://.execute-api.eu-north-1.amazonaws.com/dev/products)
- endpoint integrated with frontend app - [My shop app](https://.cloudfront.net/)

- created lambda function getProductsById
- available through url - [Product by id](https://.execute-api.eu-north-1.amazonaws.com/dev/products/1)
- implemented error message for not available id - [Product by id error](https://.execute-api.eu-north-1.amazonaws.com/dev/products/99)

- swagger - [https://.execute-api.eu-north-1.amazonaws.com/dev/swagger](https://.execute-api.eu-north-1.amazonaws.com/dev/swagger)

- ESBuild configured for product service, basic tests implemented, code separated, main error scenarios handled

##

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
