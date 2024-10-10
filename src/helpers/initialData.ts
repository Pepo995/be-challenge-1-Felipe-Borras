import { Location } from '../models/Location';

const createInitialData = async () => {
  const existingLocations = await Location.find();
  if (existingLocations.length === 0) {
    const locations = [{ name: 'classroom-101' }, { name: '1on1-room' }, { name: 'workshop-hall' }];

    await Location.insertMany(locations);
    console.log('Initial data created: Locations added');
  }
};

export default createInitialData;
