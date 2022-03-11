
import "@testing-library/react"
import ReactDOM from "react-dom"
import { Task } from "../../models/task.interface";
import TaskComponent from "./task.component";

describe("TaskComponent", () => {
  const task: Task = {
    id: "test",
    title: "test"
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TaskComponent task={task}/>, div);
  });
})
