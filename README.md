# React-shop-cloudfront - backend

## CloudX: AWS Practitioner for JS

### Assignment 7 - Authorization

#### Tasks - what was done

- authorization-service was created
- basicAuthorizer lambda was created with an environment variable (yourGitHub=TEST_PASSWORD) using an .env file
- implemented 403 for invalid token and 401 if the Authorization header was missing
- Import Service API Gateway was configured to use the basicAuthorizer lambda on the /import path
- client application was updated to send the 'Authorization: Basic {authorization_token}' header on /import requests, with token retrieved from localStorage
- client application displayed alerts for responses with 401 and 403 HTTP status codes

- ESBuild configured for product service, basic tests implemented, code separated, main error scenarios handled

- in backend repository included test-upload.csv for testing upload functionality on import path

##### Frontend

- [My shop app](https://d3mo1s5p3t66yh.cloudfront.net)

##### Backend

- available through url - [Products list](https://j0ram3ea0i.execute-api.eu-north-1.amazonaws.com/dev/products)
- error message for not available id - [Product by id error](https://j0ram3ea0i.execute-api.eu-north-1.amazonaws.com/dev/products/99)

- [BE - import service url](https://nhnsq9q964.execute-api.eu-north-1.amazonaws.com/dev/)
- [BE - product service url](https://j0ram3ea0i.execute-api.eu-north-1.amazonaws.com/dev/)

- swagger - [https://j0ram3ea0i.execute-api.eu-north-1.amazonaws.com/dev/swagger](https://j0ram3ea0i.execute-api.eu-north-1.amazonaws.com/dev/swagger)

#### Paste this in browser console to set credentials manually in local storage

#### add
`localStorage.setItem('authorization_token', btoa('testuser:testpass123')); console.log('Auth set!');` - replace btoa values with valid credentials to test, valid credentials values are set as instructed in assignment

#### remove
`localStorage.removeItem('authorization_token');`

##

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
