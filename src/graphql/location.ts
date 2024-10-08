import { gql } from "apollo-server";
import { Location } from "../models/Location";

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
    type: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    locations: [Location]
    location(id: ID!): Location
  }

  type Mutation {
    createLocation(name: String!, type: String!): Location
  }
`;

export const locationResolvers = {
  Query: {
    locations: async () => Location.find(),
    location: async (_: any, { id }: { id: string }) => Location.findById(id)
  },
  Mutation: {
    createLocation: async (
      _: any,
      { name, type }: { name: string; type: string }
    ) => {
      const location = new Location({ name, type });
      return location.save();
    }
  }
};
