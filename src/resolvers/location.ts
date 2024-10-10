import { Event } from '../models/Event';
import { Location } from '../models/Location';

export const locationResolvers = {
  Query: {
    locations: async () => Location.find(),
    location: async (_: any, { id }: { id: string }) => Location.findById(id),
  },
  Mutation: {
    createLocation: async (_: any, { name }: { name: string }) => {
      const namePattern = /^[a-zA-Z0-9-]+$/;
      if (!namePattern.test(name)) {
        throw new Error('Invalid name format. Only alphanumeric characters and hyphens are allowed.');
      }

      const location = new Location({ name });

      return location.save();
    },

    updateLocation: async (_: any, { id, name }: { id: string; name: string }) => {
      const location = await Location.findById(id);
      if (!location) throw new Error('Location not found');

      const namePattern = /^[a-zA-Z0-9-]+$/;
      if (!namePattern.test(name)) {
        throw new Error('Invalid name format. Only alphanumeric characters and hyphens are allowed.');
      }

      location.name = name;
      location.updatedAt = new Date();

      return location.save();
    },

    deleteLocation: async (_: any, { id }: { id: string }) => {
      const events = await Event.find({ location: id });
      if (events.length > 0) throw new Error('Cannot delete location with active events');

      const location = await Location.findById(id);
      if (!location) throw new Error('Location not found');

      await location.deleteOne();

      return true;
    },
  },
};
