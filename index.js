
const { ApolloServer, ApolloError } = require('apollo-server');
const ApodHistoryAPI = require('./datasources/apodHistory');
const typeDefs = require('./schema.js');
const resolvers = require("./resolvers.js");

const dataSources = () => ({
  apodHistoryAPI: new ApodHistoryAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  debug: false,
  formatError: err => {
    if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
      return new ApolloError("We are having trouble","ERROR", {token: 'uniquetoken'} );
    }
    return err;
  }
});


server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`graphQl running at ${url}`);
  });