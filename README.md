# record-search

## Getting Started

### Installation
1. Clone the repo
```sh
git clone https://github.com/bhaskarbb/record-search.git
```
2. Install dependences
```sh
npm install
```
3. Create .env file (use sample.env for reference)
```
cp sample.env .env
```

### Run
Local Developement
```sh
npm run dev
```
Build project
```sh
npm run build
```
Run built files 
```sh
npm start
```

### Test
To run tests
```sh
npm run test
```
#### Note: A local mongodb instance needs to running at PORT 27017 to execute all tests
To Format
```sh
npm run format
```
To Lint
```sh
npm run lint
```

## API
### Endpoint: /records/
### Method: POST
### Request Body:
```json
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}
```
### Sample Response:
```JSON
{
  "code":0,
  "msg":"Success",
  "records":[
    {
      "key":"TAKwGc6Jr4i8Z487",
      "createdAt":"2017-01-28T01:22:14.398Z",
      "totalCount":2800
    },
    {
      "key":"NAeQ8eX7e5TEg7oH",
      "createdAt":"2017-01-27T08:19:14.135Z",
      "totalCount":2900
    }
  ]
}
```

## Project Structure (inside src)
### config - Extracts and stores env variables
### controllers - Deals with express req/res, validates request, calls services
### models - Data access layer, mongoose models are defined here
### routes - Hierarchical route definations, maps routes to controllers
### services - Stores business logic, interacts with models
### utils - Stores helper functions and classes
### validations - Stores Joi schema objects, for request validaitons
### app.ts - Defines express app, initializes middlewares and routes
### server.ts - Entry point, connects database and starts server
### types.ts - Stores typescript type definations
