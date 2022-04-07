
import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
import SprintComponent from "./sprint.component";
import ReactDOM from "react-dom";

const boardWithoutTasks = {
  roomId: "default",
  id: "test",
  columns: [],
  tasks: [],
  start: new Date(),
  finish: new Date()
}

const boardWithTasks = {
  roomId: "default",
  id: "test",
  columns: [],
  tasks: [{
    id: "task1",
    title: "First task",
    status: "to-do"
  },{
    id: "task2",
    title: "Second task",
    status: "to-do"
  }],
  start: new Date(),
  finish: new Date()
}

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }: any) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }: any) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  DragDropContext: ({ children }: any) => children,
}));

describe("SprintComponent", () => {
  const setup = () => render(<SprintComponent board={boardWithoutTasks}/>);

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SprintComponent board={boardWithTasks}/>, div)
  });
  
  it("after clicking details must remove default text", () => {
    setup()
    const details = screen.getByTestId("details-element")

    expect(screen.getByText(/Planifica un sprint/i)).toBeInTheDocument()
    fireEvent.click(details)
    expect(screen.queryByText(/Planifica un sprint/i)).not.toBeInTheDocument()
  })
  
  it("after clicking complete sprint button must complete sprint", () => {
    setup()
    const completeSprintButton = screen.getByText("Completar sprint")

    expect(completeSprintButton).toBeInTheDocument()
    fireEvent.click(completeSprintButton)
  })
})


