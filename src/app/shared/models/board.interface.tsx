import { Task } from "./task.interface";

export interface Board {
  roomId: string
  id: string
  columns: Array<string>
  tasks: Array<Task>
  start: Date
  finish: Date
}