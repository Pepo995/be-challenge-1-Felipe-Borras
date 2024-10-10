import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9-]+$/,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Location = model('Location', LocationSchema);
