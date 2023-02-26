import { Note } from '../models/Note';

export const Query = {
  notes() {
    return Note.find();
  },
  note(parent, args) {
    return Note.findById(args.id);
  }
};
