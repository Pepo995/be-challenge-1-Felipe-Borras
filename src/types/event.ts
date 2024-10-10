import { gql } from 'apollo-server';
import { Schema, SortOrder } from 'mongoose';

enum EventType {
  'class',
  '1-on-1',
  'workshop',
}

export type EventQueryParams = {
  locationId: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
  search?: string;
};

export type CreateEventParams = {
  name: string;
  dateTime: Date;
  type: EventType;
  locationId: string;
  description: string;
  tags?: string[];
};

export type UpdateEventParams = {
  id: string;
  name?: string;
  dateTime?: Date;
  type?: EventType;
  description?: string;
  tags?: string[];
};

export const eventTypeDefs = gql`
  input EventQueryParams {
    locationId: String!
    sortBy: String
    sortOrder: Int
    limit: Int
    offset: Int
    search: String
  }

  input CreateEventParams {
    name: String!
    dateTime: String!
    type: String!
    locationId: ID!
    description: String!
    tags: [String]
  }

  input UpdateEventParams {
    id: ID!
    name: String
    dateTime: String
    type: String
    description: String
    tags: [String]
  }

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
    events(eventQueryParams: EventQueryParams): [Event]
  }

  type Mutation {
    createEvent(createEventParams: CreateEventParams): Event

    updateEvent(updateEventParams: UpdateEventParams): Event

    deleteEvent(id: ID!): Boolean
  }
`;
