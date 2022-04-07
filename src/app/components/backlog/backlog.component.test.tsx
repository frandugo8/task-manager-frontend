
import { render, screen, within } from "@testing-library/react";
import ReactDOM from "react-dom"
import {
  mockGetComputedStyle,
  mockDndSpacing,
  makeDnd,
  DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import BacklogComponent from "./backlog.component";

const verifyTaskOrderInColumn = (
  columnTestId: string,
  orderedTasks: string[]
): void => {
  const texts = within(screen.getByTestId(columnTestId))
    .getAllByTestId('task')
    .map(x => x.textContent);
  expect(texts).toEqual(orderedTasks);
};

describe("BacklogComponent", () => {
  const initialState = {dispatch: {}, boards: [{
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
    ReactDOM.render(<Provider store={store}><BacklogComponent/></Provider>, div);
  });

  describe("dnd", () => {
    beforeEach(() => {
      mockGetComputedStyle();
    });

    it("moves a task down inside a board", async () => {
      store = mockStore(initialState)
      const { container } = render(<Provider store={store}><BacklogComponent/></Provider>)
      mockDndSpacing(container);
  
      await makeDnd({
        getDragElement: () =>
          screen
            .getByText('First task'),
        direction: DND_DIRECTION_DOWN,
        positions: 2
      });
  
      verifyTaskOrderInColumn("sprint1", [
        'Second task',
        'Third task',
        'First task'
      ])
    })
  })
})
