
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import {
  mockGetComputedStyle,
  mockDndSpacing,
  makeDnd,
  DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import BoardComponent from "./board.component";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const verifyTaskOrder = (
  orderedTasks: string[]
): void => {
  const texts = screen.getAllByText(/task/i)
    .map(x => x.textContent);
  expect(texts).toEqual(orderedTasks);
};

describe("TableComponent", () => {
  const initialState = {boards: [{
    roomId: "default",
    id: "sprint1",
    columns: [{id: "to-do", name: "Por hacer", isInitial: true, isDone: false}],
    tasks: [{
      id: "1",
      title: "First task",
      status: "to-do"
    },{
      id: "2",
      title: "Second task",
      status: "to-do"
    },{
      id: "3",
      title: "Third task",
      status: "to-do"
    }],
    start: new Date(),
    finish: new Date()
  }]}

  const mockStore = configureStore()
  let store

  it('renders without crashing', () => {
    const div = document.createElement('div');
    store = mockStore(initialState)
    ReactDOM.render(<Provider store={store}><BoardComponent/></Provider>, div);
  });

  describe("dnd", () => {
    beforeEach(() => {
      mockGetComputedStyle();
    });

    it("moves a task down inside a column", async () => {
      store = mockStore(initialState)
      const { container } = render(<Provider store={store}><BoardComponent/></Provider>)

      mockDndSpacing(container);
  
      await makeDnd({
        getDragElement: () =>
          screen
            .getByText('First task'),
        direction: DND_DIRECTION_DOWN,
        positions: 2
      });
  
      verifyTaskOrder([
        'Second task',
        'Third task',
        'First task'
      ])
    })
  })
})
