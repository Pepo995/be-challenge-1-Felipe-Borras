import { SortOrder, Types } from 'mongoose';
import { Event } from '../models/Event';
import { Location } from '../models/Location';
import { CreateEventParams, EventQueryParams, UpdateEventParams } from '../types/event';

export const eventResolvers = {
  Query: {
    events: async (
      _: any,
      {
        eventQueryParams: { locationId, sortBy = 'dateTime', sortOrder = 1, limit = 10, offset = 0, search = '' },
      }: { eventQueryParams: EventQueryParams },
    ) => {
      const sortField = sortBy === 'name' ? 'name' : 'dateTime';
      const sortOptions = { [sortField]: sortOrder }; // 1 for ascending, -1 for descending
      return Event.find({
        location: locationId,
        name: { $regex: search, $options: 'i' },
        dateTime: { $gt: new Date() },
      })
        .sort(sortOptions)
        .skip(offset)
        .limit(limit);
    },
  },
  Mutation: {
    createEvent: async (_: any, { createEventParams }: { createEventParams: CreateEventParams }) => {
      const location = await Location.findById(createEventParams.locationId);

      if (!location) throw new Error('Location not found for this event');
      const event = new Event({ ...createEventParams, location });

      return event.save();
    },

    updateEvent: async (_: any, { updateEventParams }: { updateEventParams: UpdateEventParams }) => {
      const event = await Event.findById(updateEventParams.id);
      if (!event) throw new Error('Event not found');

      const date = new Date();

      if (date > event.dateTime) {
        throw new Error('Event cannot be updated after its date/time');
      }

      const { id, ...updateData } = updateEventParams;

      Object.assign(event, updateData);
      event.updatedAt = date;

      return event.save();
    },

    deleteEvent: async (_: any, { id }: { id: string }) => {
      const event = await Event.findById(id);
      if (!event) throw new Error('Event not found');

      const date = new Date();

      if (date > event.dateTime) {
        throw new Error('Event cannot be deleted after its date/time');
      }

      await event.deleteOne();
      return true;
    },
  },
  Event: {
    location: async (parent: any) => Location.findById(parent.location),
  },
};
