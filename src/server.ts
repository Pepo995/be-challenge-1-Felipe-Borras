import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/index";
import connectDB from "./config/db";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  connectDB();

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
