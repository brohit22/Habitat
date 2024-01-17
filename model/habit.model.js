import mongoose, { Schema } from 'mongoose';

// Schema for habit
const habitSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    habitName: {
      type: String,
      required: true,
    },
    record_tracker: {
      type: Map,
    },
    dates: [
      {
        date: String,
        complete: String,
      },
    ],
  },
  {
    timestamp: true,
  }
);

// creating a model for habit schema
export const Habit = mongoose.model('Habit', habitSchema);
