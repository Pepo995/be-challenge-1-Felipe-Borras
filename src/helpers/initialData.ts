import { Location } from "../models/Location";

const createInitialData = async () => {
  const existingLocations = await Location.find();
  if (existingLocations.length === 0) {
    const locations = [
      { name: "classroom-101", type: "class" },
      { name: "1on1-room", type: "1-on-1" },
      { name: "workshop-hall", type: "workshop" }
    ];

    await Location.insertMany(locations);
    console.log("Initial data created: Locations added");
  }
};

export default createInitialData;
