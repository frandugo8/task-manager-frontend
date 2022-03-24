import { Task } from "./task.interface";

export interface BoardColumn {
  id: string,
  name: string,
  isInitial: boolean
  isDone: boolean
  tasks?: Array<Task>
}