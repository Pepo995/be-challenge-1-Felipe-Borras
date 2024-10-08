import { eventTypeDefs, eventResolvers } from "./event";
import { locationTypeDefs, locationResolvers } from "./location";

export const typeDefs = [eventTypeDefs, locationTypeDefs];

export const resolvers = {
  Query: {
    ...eventResolvers.Query,
    ...locationResolvers.Query
  },
  Mutation: {
    ...eventResolvers.Mutation,
    ...locationResolvers.Mutation
  },
  Event: {
    ...eventResolvers.Event
  }
};
