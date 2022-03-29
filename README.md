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
git clone https://github.com/anujparikh/take-home-assessment.git
yarn install
yarn start:db
yarn start:app
```

### Mongo Database

For this service, we are using in-memory mongodb which would be seeded by `yarn start:db` command

### Design Decisions

- Project has been structured in such a way that each folder would be following Single Responsibility principle
- Keeping service and datasource layer separate helps to incorporate middleware logic after fetching data from different data sources
  - all the communication to DB or REST endpoints would happen through this layer only.
  - it helps with ease of debugging
  - it also helps while doing unit testing as we can easy mock service/data source classes
- Keeping graphql schema related code separate helps to maintain when project grows

### Project Structure

- **config**: would be having all configuration related to different data sources within the service
- **datasource**: would have different datasources available for apollo server to consume
- **graphql**: would have all the type definitions and resolvers for graphql queries
- **models**: would have all the mongoose models made with mongodb collections
- **service**: this layer would expose methods which would talk to different DBs or REST APIs
- **server.js**: this is file which would be responsible for spinning up Apollo server
- **index.js**: this is file which would spin up apollo server for service to run on

### Environment variables

- this project is using `dotenv` package to maintain environment variables for the service
- to avoid pushing sensitive information, `.env` file has been ignored in .gitignore
- before running the application, please create `.env` file at root of folder according to `.env.example` file
