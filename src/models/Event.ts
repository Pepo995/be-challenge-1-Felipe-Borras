import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  type: { type: String, required: true },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },
  description: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

EventSchema.pre("save", function (next) {
  if (this.isModified("dateTime") && new Date(this.dateTime) < new Date()) {
    throw new Error("Cannot update past events.");
  }
  next();
});

export const Event = model("Event", EventSchema);
