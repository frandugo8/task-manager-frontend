
import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import SprintComponent from "./sprint.component";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

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

let store: any
const initialState = {dispatch: {}, boards: []}

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

describe("SprintComponent", () => {
  const mockStore = configureStore()
  store = mockStore(initialState)
  const setup = () => render(<Provider store={store}><SprintComponent board={boardWithoutTasks}/></Provider>);

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Provider store={store}><SprintComponent board={boardWithTasks}/></Provider>, div)
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

