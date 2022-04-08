
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import {
  mockGetComputedStyle,
  mockDndSpacing,
  makeDnd,
  DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import BacklogComponent from "./backlog.component";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { taskManagerRemoteService } from "../../shared/services/remote/task-manager/task-manager.remote.service";

let spies: any

describe("BacklogComponent", () => {
  const initialState = {boards: [{
    roomId: "default",
    id: "sprint1",
    columns: [{id: "to-do", name: "Por hacer", isInitial: true, isDone: false}],
    tasks: [{
      id: "task1",
      title: "First task",
      status: "to-do"
    },{
      id: "task2",
      title: "Second task",
      status: "to-do"
    },{
      id: "task3",
      title: "Third task",
      status: "to-do"
    }],
    start: new Date(),
    finish: new Date()
  }], dispatch: {}}

  const mockStore = configureStore()
  let store

  beforeEach(() => {
    loadSpies()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    store = mockStore(initialState)
    ReactDOM.render(<Provider store={store}><BacklogComponent/></Provider>, div);
  });

  describe("dnd", () => {
    beforeEach(() => {
      mockGetComputedStyle();
    });

    it("moves a task down inside a column", async () => {
      store = mockStore(initialState)
      const { container } = render(<Provider store={store}><BacklogComponent/></Provider>)

      mockDndSpacing(container);
  
      await makeDnd({
        getDragElement: () =>
          screen
            .getByTestId('task1'),
        direction: DND_DIRECTION_DOWN,
        positions: 2
      });

      expect(spies.taskManagerRemoteService).toHaveBeenCalled();
    })
  })
})

function loadSpies() {
  spies = {
    taskManagerRemoteService: jest.spyOn(taskManagerRemoteService, "updateTaskPriority")
      .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({})
    }))
  }
}