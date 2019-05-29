[![Build Status](https://travis-ci.org/dessHub/population-management-system.svg?branch=master)](https://travis-ci.org/dessHub/population-management-system)

# Population-Management-Application-API
Population Management Application API is a simple appliaction that enables users to create and populate a list of locations and the total number of residents in each location broken down by gender..


**Technologies
 - [Nodejs](https://nodejs.org/) - Javascript runtime
 - [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework.
 - [Postgres](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system.
 - [Helmet](https://helmetjs.github.io/docs/) - Package to secure the API.

**How to set up locally**
* clone the repo

     `git clone https://github.com/dessHub/population-management-system.git`

* checkout to develop branch

     `git checkout develop`

* Install postgres and create database  both for development and testing
* Copy `.env.example` to `.env` and update the values.
* Install dependencies

     `npm install`

* Run database migrations

     `npm run db:migrate`

* start the application with

     `npm start`

* Run the tests

     `npm run test`

**API features**
* creating locations
* displaying locations
* deleting location
* updating location
* get the location by name

**Endpoints exposed by the API**


Endpoint                    |  Functionality
 ------------------------   |   ------------------------
GET /locations              | get all locations
GET /locations/:name        | get location with the given name
POST /locations             | create location
UPDATE /locations/:id       | update location with the given id
DELETE /locations/:id       | delete location with the given id

**Endpoint payload**

* POST /locations
```
{
  "name": "locationName",
  "males": "males count"
  "females": "females count"
  "parentLocation": "parent location"
}
```

** The parentLocation have to be existing for successful
locations creation**


