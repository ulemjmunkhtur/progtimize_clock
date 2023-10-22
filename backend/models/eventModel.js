import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  }
);

export const Event = mongoose.model('events', eventSchema);
