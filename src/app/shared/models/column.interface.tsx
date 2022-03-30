import { Task } from "./task.interface";

export interface Column {
  id: string,
  name: string,
  isInitial: boolean
  isDone: boolean
  tasks?: Array<Task>
}