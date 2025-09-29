# React-shop-cloudfront - backend

## CloudX: AWS Practitioner for JS

### Assignment 4 - Integration with NoSQL Database

#### Tasks

- created two database tables in DynamoDB: products and stock table
- wrote a script to fill tables with test examples (seed-tables.ts)
- integrated the getProductsList lambda to return via GET /products request a list of products from the database (joined stock and products tables) and implemented product model on FE side - [My shop app](https://d1kq5q0usw740u.cloudfront.net)

- created lambda function getProductsList
- available through url - [Products list](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/products)

- created lambda function getProductsById
- available through url - [Product by id](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/products/f1e29929-44cf-400a-b9bf-edcb050e32ab)
- implemented error message for not available id - [Product by id error](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/products/99)

- created a lambda function called createProduct under Product Service which is triggered by the HTTP POST method via /products url

- swagger - [https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/swagger](https://himujifavc.execute-api.eu-north-1.amazonaws.com/dev/swagger)

- ESBuild configured for product service, basic tests implemented, code separated, main error scenarios handled

##

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
