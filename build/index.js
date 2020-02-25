import { resolve } from 'path';
import { mergeTypes, fileLoader } from 'merge-graphql-schemas';
import { ApolloServer, gql } from 'apollo-server';
import resolvers from './resolvers';
var schema = mergeTypes(fileLoader(resolve(__dirname, './schema')));
var apolloOptions = {
  typeDefs: gql(schema),
  resolvers: resolvers
};
new ApolloServer(apolloOptions).listen(4000).then(function (_ref) {
  var url = _ref.url,
      subscriptionsUrl = _ref.subscriptionsUrl;
  console.log("\uD83D\uDE80 Server ready at ".concat(url));
  console.log("\uD83D\uDE80 Subscriptions ready at ".concat(subscriptionsUrl));
}).catch(function (error) {
  console.log("\uD83D\uDE80 Subscriptions error ".concat(error));
});