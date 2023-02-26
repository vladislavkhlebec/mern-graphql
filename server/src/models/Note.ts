import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  { timestamps: true }
);

export const Note = mongoose.model('Note', NotesSchema);
