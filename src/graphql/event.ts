import { gql } from "apollo-server";
import { Event } from "../models/Event";
import { Location } from "../models/Location";

export const eventTypeDefs = gql`
  type Event {
    id: ID!
    name: String!
    dateTime: String!
    type: String!
    location: Location!
    description: String
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  type Query {
    events(locationId: ID!): [Event]
  }

  type Mutation {
    createEvent(
      name: String!
      dateTime: String!
      type: String!
      locationId: ID!
      description: String
      tags: [String]
    ): Event
  }
`;

export const eventResolvers = {
  Query: {
    events: async (_: any, { locationId }: { locationId: string }) =>
      Event.find({ location: locationId }).sort({ dateTime: -1 })
  },
  Mutation: {
    createEvent: async (_: any, args: any) => {
      const event = new Event(args);
      return event.save();
    }
  },
  Event: {
    location: async (parent: any) => Location.findById(parent.location)
  }
};
