
import "@testing-library/react"
import AppComponent from "./app.component"
import ReactDOM from "react-dom"
import { taskManagerRemoteService } from "./shared/services/remote/task-manager/task-manager.remote.service"
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

let spies: any
let store: any
const initialState = {dispatch: {}, boards: []}

describe("AppComponent", () => {
  const mockStore = configureStore()

  beforeEach(() => {
    loadSpies()
  })

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><AppComponent/></Provider>, div);
  })

  it('must load initial boards data', async () => {
    store = mockStore(initialState)
    render(<Provider store={store}><AppComponent/></Provider>)
    expect(spies.taskManagerRemoteService).toHaveBeenCalledWith("default");
  })

  function loadSpies() {
    spies = {
      taskManagerRemoteService: jest.spyOn(taskManagerRemoteService, "getBoards")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([{
          id: "backlog",
          columns: [],
          tasks: [
            {id: "task2", title: "Task 2", status: "to-do"},
            {id: "task1", title: "Task 1", status: "to-do"},
            {id: "task3", title: "Task 3", status: "to-do"}
          ]},{
            id: "sprint1",
            columns: [
              {id: "in-progress", name: "En progreso", isInitial: false, isDone: false},
              {id: "in-revision", name: "En revisión", isInitial: false, isDone: false},
              {id: "to-do", name: "Por hacer", isInitial: true, isDone: false},
              {id: "done", name: "Listo", isInitial: false, isDone: true}
            ],
            tasks: [
              {id: "task4", title: "Task 4", status: "to-do"}
            ],
            start: "2022-03-16T23:00:00.000Z",
            finish: "2022-03-30T22:00:00.000Z"
        }])
      }))
    }
  }
})

