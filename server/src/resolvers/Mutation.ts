import { v4 as uuidv4 } from 'uuid';

import { Note } from '../models/Note';

export const Mutation = {
  async createNote(parent, args) {
    const { title, content } = args;
    const id = uuidv4();

    const newNote = {
      id,
      title,
      content
    };

    await Note.create({ id, title, content });

    return newNote;
  },
  async updateNote(parent, args) {
    const { id, title, content } = args;

    const note = await Note.findOne({ _id: id });

    if (!note) throw new Error('Note not found');

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    return note;
  },
  async deleteNote(parent, args) {
    const { id } = args;

    const result = await Note.deleteOne({ id });

    return Boolean(result.deletedCount);
  }
};
