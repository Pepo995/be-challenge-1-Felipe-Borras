import { ApolloError, ValidationError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';
import { Error } from 'mongoose';

export const errorLogger = (error: GraphQLError) => {
  console.error(`[Error]: ${error.message}`, {
    locations: error.locations,
    path: error.path,
    extensions: error.extensions,
  });
};

export const errorResponder = (error: GraphQLError) => {
  if (error.originalError instanceof ValidationError || error.originalError instanceof Error.ValidationError) {
    const statusCode = error.extensions?.statusCode || 500;
    return new ApolloError('Invalid input provided', 'BAD_USER_INPUT');
  }

  const statusCode = error.extensions?.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  return {
    message,
    statusCode,
    extensions: {
      ...error.extensions,
      code: statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : error.extensions?.code,
    },
  };
};

export const failSafeHandler = () => {
  return new ApolloError('Something went wrong, please try again later.', 'INTERNAL_SERVER_ERROR');
};
