import mongoose from "mongoose";
import { ISubtask } from "../types/ISubtask";
const Schema = mongoose.Schema;

const SubtaskSchema = new Schema<ISubtask>({
  content: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Subtasks', SubtaskSchema);