import { Column } from "./column.interface";
import { Task } from "./task.interface";

export interface Board {
  roomId: string
  id: string
  columns: Array<Column>
  tasks: Array<Task>
  start: Date
  finish: Date
}