
import "@testing-library/react"
import ReactDOM from "react-dom"
import TableListComponent from "./table-list.component";

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
    ReactDOM.render(<TableListComponent
      column={{id: "test", name: "column", "tasks": [{
        id: "1",
        title: "Task1"
      }]}}
    />, div);
  });
})
