import { gql } from 'apollo-server';

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    locations: [Location]
    location(id: ID!): Location
  }

  type Mutation {
    createLocation(name: String!): Location

    updateLocation(id: ID!, name: String!): Location

    deleteLocation(id: ID!): Boolean
  }
`;
