
import "@testing-library/react"
import AppComponent from "./app.component"
import ReactDOM from "react-dom"
import { taskManagerRemoteService } from "./shared/services/remote/task-manager/task-manager.remote.service"
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

let spies: any
let store: any
const initialState = {dispatch: {}}

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
          tasks: []
          }])
        }))
    }
  }
})

