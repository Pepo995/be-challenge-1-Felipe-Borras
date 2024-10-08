import { Schema, model } from "mongoose";

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9-]+$/
  },
  type: {
    type: String,
    enum: ["class", "1-on-1", "workshop"],
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Location = model("Location", LocationSchema);
