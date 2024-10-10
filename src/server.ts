import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './types';
import { resolvers } from './resolvers';
import connectDB from './config/db';
import { errorLogger, errorResponder, failSafeHandler } from './middlewares/error';

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
    formatError: (error) => {
      errorLogger(error);

      return errorResponder(error) || failSafeHandler();
    },
  });

  connectDB()
    .then((db) => db)
    .catch((error) => console.log(error));

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
