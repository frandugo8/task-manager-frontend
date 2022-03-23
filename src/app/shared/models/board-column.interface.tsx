import { Task } from "./task.interface";

export interface BoardColumn {
  id: string,
  name: string,
  tasks: Array<Task>
}