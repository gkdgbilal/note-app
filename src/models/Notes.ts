import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 60,
  },
  description: {
    type: String,
    required: true,
    maxLength: 300,
  },
  priority: {
    type: String,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
  image: {
    type: String,
  },
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
