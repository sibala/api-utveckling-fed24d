import { ISubtask } from "./ISubtask";

export interface ITodo {
  content: string;
  done: boolean;
  subtasks: ISubtask[],
  created_at: Date;
}