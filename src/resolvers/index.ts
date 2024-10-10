import { eventResolvers } from './event';
import { locationResolvers } from './location';

export const resolvers = {
  Query: {
    ...eventResolvers.Query,
    ...locationResolvers.Query,
  },
  Mutation: {
    ...eventResolvers.Mutation,
    ...locationResolvers.Mutation,
  },
  Event: {
    ...eventResolvers.Event,
  },
};
