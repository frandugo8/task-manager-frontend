
import "@testing-library/react"
import ReactDOM from "react-dom"
import BoardListComponent from "./board-list.component";

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

describe("TableListComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BoardListComponent
      column={{id: "test", name: "column", isInitial: false, isDone: false, "tasks": [{
        id: "1",
        title: "Task1",
        status: "to-do"
      }]}}
    />, div);
  });
})
