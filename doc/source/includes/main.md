# Introduction

This is the *adwords interface* API documentation.<br>
Examples will be given in *NodeJS* with the `superagent` module.<br>
This API documentation page was created with [Slate](https://github.com/tripit/slate).

## Roles

Two roles are defined in this application : *User* and *Manager*.<br>
The manager has the following privileges :
- create new users or new managers
- delete or update users

## Authentication

The application uses API keys to allow access to the API. To get an API key, just login (`/api/users/login`).<br>
The application expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow`

<aside class="notice">
You must replace <code>meowmeowmeow</code> with your personal API key.
</aside>

## Content-Type

The API only accept `application/json` Content-Type.

# Users

## Login

```javascript
const request = require('superagent');
const baseURL = 'http://example.com';

request(baseURL)
    .post('/api/users/login')
    .type('form')
    .send({email: 'my_email@gmail.com', password: 'my_password'})
    .end((err, res) => { /* ... */ })

```

> The above command returns JSON structured like this:

```json
  {
    "connected": "true"
  }
```

This endpoint allows you to login and retrieve your API token in the header response.

### HTTP Request

`POST http://example.com/api/users/login`

### Request payload

Parameter      | Default        | Description            | State
-------------- | -------------- | --------------         | --------------
email       | `null`         | email of the user      | <span class="red">**required**</span>
password       | `null`         | password of the user   | <span class="red">**required**</span>

### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    400        | Wrong payload                       | `'Bad request'`
    401        | Wrong credentials                   | `'Unauthorized'`

### HTTP Response Header

`Cookie:connect.sid=s%3AUqHGAAnzuvIhnpS8j7LeGaQTbZ99_QZm.fGGw%2F6s5DS4k1P299mfya9TuqzGNH9D8m7PwaVJmaUU`

<aside class="success">
Remember — a happy kitten is an authenticated kitten!<br/>
<i>Yes, I've decided to let this sentence here just because it's cute! And I know it comes from the Slater example ;)</i>
</aside>

## Create an User


```javascript
const request = require('superagent');
const baseURL = 'http://example.com';
const ADMIN_TOKEN = 'asDgdFCCh45sdvg34';
const user = {
    name: 'testName NAME',
    email: 'test@mail.net',
    password: 'password',
    role: 'user'
};

request(app)
    .post('/api/users')
    .set({'Authorization': ADMIN_TOKEN})
    .type('form')
    .send({
        name:      user.name,
        email:     user.email,
        password:  user.password,
        role:      user.role
    }).end((err, res) => { /* ... */ })

```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "testName NAME",
  "email": "test@mail.net",
  "role": "user",
  "manager": 42,
  "customer_id": "4234427842"
}
```

This endpoint creates an user.<br/>
You need to be Manager to access this endpoint (Manager token is required).

### HTTP Request

`POST http://example.com/api/users`

### Request payload

Parameter      | Default        | Description            | State
-------------- | -------------- | --------------         | --------------
name           | `null`         | name of the user       | <span class="red">**required**</span>
email          | `null`         | email of the user      | <span class="red">**required**</span>
password       | `null`         | password of the user   | <span class="red">**required**</span>
role           | `'user'`       | role of the created user   | (optional)
marge          | `1`            | margin to apply to the campaign price   | (optional)

### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    400        | Wrong payload                       | `'Bad request'`
    401        | Wrong credentials                   | `'Unauthorized'`

## Get all Users


```javascript
const request = require('superagent');
const baseURL = 'http://example.com';
const USER_TOKEN = '43fgdsgdFghf45sdg34';

request(app)
    .get('/api/users')
    .set({'Authorization': USER_TOKEN})
    .end((err, res) => { /* ... */ })

```

> The above command returns JSON structured like this:

```json
[{
  "id": 1,
  "name": "admin ADMIN",
  "email": "admin@mail.net",
  "role": "manager",
  "manager": 1,
  "customer_id": "7835486548"
}, {
  "id": 2,
  "name": "testName NAME",
  "email": "test@mail.net",
  "role": "user",
  "manager": 42,
  "customer_id": "4234427842"
}, {
  ...
}]
```

This endpoint get all users.<br/>
You need to be an authenticated user to access this endpoint (User token is required).

### HTTP Request

`GET http://example.com/api/users`

### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    401        | Wrong token                         | `'Unauthorized'`

## Get a specific User


```javascript
const request = require('superagent');
const baseURL = 'http://example.com';
const USER_TOKEN = '43fgdsgdFghf45sdg34';

request(app)
    .get('/api/users/1')
    .set({'Authorization': USER_TOKEN})
    .end((err, res) => { /* ... */ })

```

> The above command returns JSON structured like this:

```json
{
  "id": 1,
  "name": "admin ADMIN",
  "email": "admin@mail.net",
  "role": "manager",
  "manager": 1,
  "customer_id": "7835486548",
  "marge": 1.25
}
```

This endpoint get a specific user by ID.<br/>
You need to be an authenticated user to access this endpoint (User token is required).

### HTTP Request

`GET http://example.com/api/users/<ID>`

### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    401        | Wrong token                         | `'Unauthorized'`


## Update an user


```javascript
const request = require('superagent');
const baseURL = 'http://example.com';
const ADMIN_TOKEN = 'asDgdFCCh45sdvg34';

request(app)
    .put('/api/users/1')
    .set({'Authorization': ADMIN_TOKEN})
	.type('form')
	.send({'password': 'my_new_password', 'email': 'my_new_email@mail.net'})
    .end((err, res) => { /* ... */ })

```

> The above command returns JSON structured like this:

```json
{
  "id": 1,
  "name": "admin ADMIN",
  "email": "'my_new_email@mail.net",
  "role": "manager",
  "manager": 1,
  "customer_id": "7835486548"
}
```

This endpoint updates an user.<br/>
You need to be Manager to access this endpoint or to be the updated user (Manager token is required or token of the updated user). A manager cannot update the profile of another Manager.

### HTTP Request

`PUT http://example.com/api/users/<ID>`

### Request payload

Parameter      | Default        | Description            | State
-------------- | -------------- | --------------         | --------------
email          | `null`         | email of the user      | (optional)
password       | `null`         | password of the user   | (optional)
role           | `null`         | user or manager        | <span class="red">**Managers only**</span>
marge          | `null`         | margin to apply to the campaign price   | <span class="red">**Managers of the user only**</span>


### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    401        | Wrong token                         | `'Unauthorized'`
    403        | When trying to update an admin that isn't you  | `'Forbidden'`


## Delete an user

```javascript
const request = require('superagent');
const baseURL = 'http://example.com';
const ADMIN_TOKEN = 'asDgdFCCh45sdvg34';

request(app)
    .delete('/api/users/2')
    .set({'Authorization': ADMIN_TOKEN})
    .end((err, res) => { /* ... */ })

```

> The above command returns JSON structured like this:

```json
{
    "deleted": true
}
```

This endpoint deletes an user.<br/>
You need to be Manager to access this endpoint or to be the deleted user (Manager token is required or token of the updated user). A Manager cannot delete another Manager.

### HTTP Request

`DELETE http://example.com/api/users/<ID>`

### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    401        | Wrong token                         | `'Unauthorized'`
    403        | When trying to update an admin that isn't you  | `'Forbidden'`



# Forecasts

## 'Get' a forecast

```javascript
const request = require('superagent');
const baseURL = 'http://example.com';
const USER_TOKEN = 'asDgdFx42xg34';

const keywords = [
    {
        text: 'cute kittens',
        matchtype: 'BROAD'
    }, {
        text: 'fluffy kittens',
        matchtype: 'PHRASE'
    }
];

request(app)
    .post('/api/forecast/')
    .set({'Authorization': USER_TOKEN})
	.type('form')
	.send({
        keywords,
        campaignName: 'my amazing kitten campaign',
        monthDuration: 3,
        locations: ['1002378', '1006235'],  // adwords IDs
        languages: ['1002', '1000'],  // adwords IDs
    })
    .end((err, res) => { /* ... */ })
```

> The above command returns JSON structured like this:

```json
{
    rawData: { ... }, // type TrafficEstimatorResult (v201710)
    extendedDataEstimate: [
        {
            "totalClicks": 11277.39915,
            "totalImpressions": 26128788480,
            "costPerImpression": 0.007149498268662168,
            "estimatedPosition": 1,
            "totalCost": 186807728,
            "impressionsPerDay": 290319872,
            "clicksPerDay": 125.304435,
            "clickThroughRate": 0.13151758909225464,
            "averagePosition": 1.7544609212126931,
            "averageCpc": 150579623201.5,
            "keyword": {
                "matchtype": "BROAD",
                "text": "cute kittens"
            }
        }, { ... } // and so on
    ],
	keywordsSort: [
        {
            "clickNumberIndice": 1,
            "costPerImpressionIndice": 71,
            "costPerClickIndice": 1,
            "keyword": {
                "matchtype": "BROAD",
                "text": "cute kittens"
            }
        }, { ... } // and so on
    ],
	costPositionData: [
        {
            "clickPercent": 0.18441337928994603,
            "impressionPercent": 0.14432347756704944,
            "averageCost": 100.0025195,
            "averagePosition": 1.7002130479533901,
            "estimatedPosition": 1
        }, { ... } // and so on
    ]
	dayDuration: 90
};
```

This endpoint creates a full campaign and get forecasts for the specified keywords. Then the campaign is deleted <br/>
You need to be an authenticated user to access this endpoint (User token is required).

### HTTP Request

`POST http://example.com/api/forecast`

### Request payload

Parameter           | Default    | Description                          | State
------------------- | -----------| --------------                       | --------------
keywords            | `null`     | keywords for the forecast            | <span class="red">**required**</span>
monthDuration       | `null`     | duration of the campaign (in month)  | <span class="red">**required**</span>
locations           | `null`     | locations for the campaign           | <span class="red">**required**</span>
languages           | `null`     | languages for the campaign           | <span class="red">**required**</span>
campaignName        | `null`     | name for the campaign                | (optional)


### HTTP Responses

Status Code    | Description                         | Response
-------------- | ---------------------------------   | --------------
    200        | Success                             | Look at the example
    400        | Wrong payload                       | `'Bad request'`
    401        | Wrong token                         | `'Unauthorized'`



<style>
.red {color: red;}
</style>
