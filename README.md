# Checkpoint-2
A simple document management system

[![Build Status](https://travis-ci.org/andela-gike/Checkpoint-2.svg?branch=master)](https://travis-ci.org/andela-gike/Checkpoint-2)
[![Issue Count](https://codeclimate.com/github/andela-gike/Checkpoint-2/badges/issue_count.svg)](https://codeclimate.com/github/andela-gike/Checkpoint-2)
[![Code Climate](https://codeclimate.com/github/andela-gike/Checkpoint-2/badges/gpa.svg)](https://codeclimate.com/github/andela-gike/Checkpoint-2)
[![Coverage Status](https://coveralls.io/repos/github/andela-gike/Checkpoint-2/badge.svg?branch=master)](https://coveralls.io/github/andela-gike/Checkpoint-2?branch=master)


# Document Management System
Document Management System is a react redux application based on RESTful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

This Document Management System allows users to manage documents and the administrator to create and manage users & roles. Each User has a role while documents have owners and permissions. The Administrator can view all documents, however users can only view their own documents and public ones. The default permission for documents is public.

This is a system (API) that manages documents with types, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published and can have a type set for it. It is built with NodeJS, Express and Postgres.
Source code employs ES6 syntax traspiled down to ES5 using Babel.

## Development
This application was developed using [NodeJs](https://nodejs.org) with [React Redux](http://redux.js.org/docs/basics/UsageWithReact.html) for frontend and [express](https://expressjs.com/) for routing. Postgres was used for persisting data with [Sequelize](https://sequelizejs.org) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)

## Application Features
###### User Authentication
Users are authenticated and validated us JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

###### Document Management
*   Create an account
*   Login with your credentials
*   Create new document with specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   View documents created by his access group with access level set as `role`.
*   Search a users public documents.
*   View `public` and `role` access level documents of other regular users.
*   Logout

-   In addition to the general user functions, an admin user can:
    -   View all users.
    -   View all created documents except documents with access set to private.
    -   Delete any user.
    -   Update any user's record.
    -   Create a new role.
    -   View all created roles.
    -   Search for any user.

## Installation
-   Ensure that you have NodeJs and Postgres installed on your machine
-   Clone the repository `$ git clone https://github.com/andela-gike/Checkpoint-2.git"`
-   Change into the directory `$ cd /checkpoint-2`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory as described in `.env.sample` file

## Usage
-   Run DB Migrate command with  `sequelize  db:migrate`
-   Seed you DB by running this command `npm run db:seed`, this seeds Admin Role and Regular Role.
-   Run `npm run start:dev` to start the application on development environment

## Testing
-   Run DB migrate command with `npm run db:migrate:test`.
-   Run Test `npm test`
-   You can undo your migrations by running this command `npm run db:migrate:test:undo`.

` I strongly suggest using separate DB for testing and development `

## API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
link to swagger hub page `https://app.swaggerhub.com/api/andela-gike/doCMan_bot/1.0.0`
#### API Features

The following features make up the Document Management System API:

###### Authentication
-   It uses JSON Web Token (JWT) for authentication.

-   It generates a token on successful login or account creation and returns it to the consumer.

-   It verifies the token to ensures a user is authenticated to access protected endpoints.

###### Users

-   It allows users to be created.

-   It allows users to login and obtain a token

-   It allows authenticated users to retrieve and update their information.

-   It allows the admin to manage users.

###### Roles

-   It ensures roles can be created, retrieved, updated and deleted by an admin user.
-   A non-admin user cannot create, retrieve, modify, or delete roles.
-   it allows for assignment of roles to users

###### Documents

-   It allows new documents to be created by authenticated users.

-   It ensures all documents are accessible based on the permission specified.

-   It allows admin users to create, retrieve, modify, and delete documents.


-   It ensures users can delete, edit and update documents that they own.

-   It allows users to retrieve all documents they own as well as public documents.

###### Search

-   It allows users to search public documents for a specified search term.

-   It allows admin to retrieve all documents that matches search term.

-   It allows admin to search users based on a specified search term

#### Available API Endpoints and their Functionality

EndPoint                    |   Functionality
----------------------------|------------------------
POST /users/login           |   Logs a user in.
POST /users/logout          |   Logs a user out.
POST /users/                |   Creates a new user.
GET /users/                 |   Find matching instances of user.
GET /users/<id>             |   Find user.
PUT /users/<id>             |   Update user attributes.
DELETE /users/<id>          |   Delete user.
GET /users/?limit={interger}&offset={interger}| Pagination for users
POST /documents/            |   Creates a new document instance.
GET /documents/             |   Find matching instances of document.
GET /documents/users/3      |   Get a paticular users document.
GET /documents/<id>         |   Find document.
GET /documents/?limit={interger}&offset={interger}| Pagination for documents
PUT /documents/<id>         |   Update document attributes.
DELETE /documents/<id>      |   Delete document.
GET /users/<id>/documents   |   Find all documents belonging to the user.
GET /search/users/?q={username}   |   Gets all users with username contain the search term
GET /search/documents/?q={doctitle}| Get all documents with title containing the search query
GET /users/:id/alldocuments|   Get all document owned or accessible by `userId`
GET /api/users/:identifier|Find user with email or username containing the identifier parameter

#### Role

###### POST HTTP Request
-   `POST /roles`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "id": "1",
  "title": "Admin",
  "createdAT": "2017-04-04T14:22:46.984z",
  "updatedAT": "2017-04-04T14:22:46.984z"
}
```

###### GET HTTP Request
-   `GET /roles`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "id": "1",
  "title": "Admin",
  "createdAT": "2017-04-04T14:22:46.984z",
  "updatedAT": "2017-04-04T16:22:46.984z"
}
```

#### Users
###### POST HTTP Request
-   `POST /users`
    ###### HTTP response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "message": "User was successfully created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJyb2xlSWQiOiIyIiwiaWF0IjoxNDkxODAxOTg2LCJleHAiOjE0OTMzODAxNzA3ODV9.q2FyEpxWtucY1-3Zaz4tdYL8WEr_gMXDq3vWiiEltac",
  "user": {
    "id": 15,
    "userName": "alexxy",
    "userRoleId": "2",
    "email": "wikealex@gmail.com"
  }
}
```
###### Login HTTP Request
-   `POST /users/login`
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
  "message": "You are successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJyb2xlSWQiOiIyIiwiaWF0IjoxNDkxODAyMDg1LCJleHAiOjE0OTMzODAxNzA4ODR9.SEDN_EfKAjCLhANAbCHuwo0YYY0MUckwjkPzcwq7bG0",
  "expiresIn": 1491888368799
}
```

#### Get Users
###### GET HTTP Request
-   `GET /users`
-   Requires: Admin Authentication
    ###### HTTP Response
-   HTTP status: `200: OK`
-   JSON Data
```json
{
      "id": 15,
      "firstName": "Alex",
      "lastName": "Wike",
      "email": "wikealex@gmail.com",
      "userName": "alexxy",
      "roleId": "2",
      "createdAt": "2017-04-10T05:26:26.676Z",
      "updatedAt": "2017-04-10T05:26:26.676Z"
    }
```

#### Get Users
##### GET HTTP Request
-    `GET /users/15`
-    Requires: Admin Authentication
     ##### HTTP Response
-    HTTP status: `200: OK`
-    JSON Data
```json
{
  "message": "User found!",
  "data": {
    "id": 15,
    "firstName": "Alex",
    "lastName": "Wike",
    "email": "wikealex@gmail.com",
    "userName": "alexxythe",
    "password": null,
    "roleId": "2",
    "createdAt": "2017-04-10T05:26:26.676Z",
    "updatedAt": "2017-04-10T05:37:31.610Z"
  }
}
```

#### Put Users
##### PUT HTTP Request
-    `PUT /users/15`
-    Requires: Being the user
     ##### HTTP Response
-    HTTP status: `200: OK`
-    JSON Data
```json
{
  "message": "User information updated successfully",
  "updatedProfile": {
    "firstName": "Alex",
    "lastName": "Wike",
    "email": "wikealex@gmail.com",
    "userName": "alexxythe"
  }
}
```

#### Logout users
#### P0st HTTP Request
-    `Post /users/logout`
     ###### HTTP Response
-    HTTP status: `200 0k`
-    JSON Data
```json
{
  "message": "You were logged out successfully"
}
```
#### Search users
#### GET HTTP Request
-    `Get /search/users/?q=ikgrace`
     ###### HTTP Response
-    HTTP status: `200 0k`
-    JSON Data
```json
{
  "message": "Search Results!",
  "data": {
    "result": [
      {
        "firstName": "Ike",
        "lastName": "Grace",
        "userName": "ikgrace"
      }
    ]
  }
}
```

#### Delete users
#### DELETE HTTP Request
-    `Delete /users/15`
-    Requires: Admin Authentication
     ###### HTTP Response
-    HTTP status: `200 0k`
-    JSON Data
```json
{
  "message": "User was deleted successfully"
}
```

#### Documents
###### POST HTTP Request
-   `POST /documents`
    ###### HTTP response
-   HTTP Status: `201: created`
-   JSON data
```json
{
  "id": "1",
  "title": "My First Online Diary",
  "docContent": "This is my first diary created on this application",
  "viewAccess": "private",
  "role": "1",
  "userId": "1",
  "createdAT": "2017-04-05T14:22:46.984z",
  "updatedAT": "2017-04-05T14:22:46.984z"
}
```
###### GET HTTP Request
-   `GET /documents/1`
    ###### HTTP response
-   HTTP Status: `200: 0k`
-   JSON data
```json
{
  "id": "1",
  "title": "My First Online Diary",
  "docContent": "This is my first diary created on this application",
  "viewAccess": "private",
  "role": "1",
  "userId": "1",
  "createdAT": "2017-04-05T14:22:46.984z",
  "updatedAT": "2017-04-05T14:22:46.984z"
}
```
