# Listing Service

This is service provides features to retrive data from open SimplyRETS api and store and update corresponding data with separate datasource (MongoDB)

## Tech involved

- Node.js
- SimplyRETS APIs
- GraphQL
- Apollo server - providing GraphQL server for Nodejs environment
- Mongoose - mongodb object modeling for Nodejs environment (ORM)

## Getting started guide

### Installation

```sh
git clone <project url>
yarn install
yarn start:db
yarn start:app
```

### Mongo Database

For this service, we are using in-memory mongodb which would be seeded by `yarn start:db` command

### Project Structure

- config: would be having all configuration related to different data sources within the service
- datasources: would have different datasources available for apollo server to consume
- graphql: would have all the type definitions and resolvers for graphql queries
- service: this layer would expose methods which would talk to different DBs or REST APIs
- index.js: this is file which would spin up apollo server for service to run on

### Environment variables

- this project is using `dotenv` package to maintain environment variables for the service
