import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: false,
    },
    endTime: {
      type: String,
      required: false,
    },
    duration: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      emoji: {
        type: String,
        required: false,
      },
      position: {
        type: Number,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);


const Session = mongoose.model('Session', sessionSchema);

export default Session;