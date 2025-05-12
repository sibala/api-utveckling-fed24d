import mongoose from "mongoose";
import { ITodo } from "../types/ITodo";
const Schema = mongoose.Schema;

const TodoSchema = new Schema<ITodo>({
  content: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtasks' }],
  created_at: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Todos', TodoSchema);