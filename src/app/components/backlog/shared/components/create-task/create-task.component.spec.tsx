
import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import CreateTaskComponent from "./create-task.component";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { taskManagerRemoteService } from "../../../../../shared/services/remote/task-manager/task-manager.remote.service";

let spies: any

describe("CreateTaskComponent", () => {
  const mockStore = configureStore()
  const initialState = {disptach: {}}
  let store = mockStore(initialState)

  const setup = () => render(<Provider store={store}><CreateTaskComponent boardId="sprint1"/></Provider>);

  const getInput = () => {
    render(<Provider store={store}><CreateTaskComponent boardId="sprint1"/></Provider>)
    const input = screen.getByLabelText('add-task')
    return {
      input,
      ...screen,
    }
  }

  beforeEach(() => {
    loadSpies()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Provider store={store}><CreateTaskComponent boardId="sprint1"/></Provider>, div)
  });
  
  it("after clicking details must remove default text", () => {
    setup()
    const details = screen.getByText("Crear tarea")

    expect(screen.getByText("Crear tarea")).toBeInTheDocument()
    fireEvent.click(details)
    expect(screen.queryByText("Crear tarea")).not.toBeInTheDocument()
    expect(screen.getByLabelText("add-task")).toBeInTheDocument()
    
    const {input} = getInput()
    fireEvent.change(input, {target: {value: 'testing task'}})
    expect((input as any).value).toBe('testing task')
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });
    expect(spies.taskManagerRemoteService.addTask).toHaveBeenCalled()
  })
})

function loadSpies() {
  spies = {
    taskManagerRemoteService: {
      addTask: jest.spyOn(taskManagerRemoteService, "addTask")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([{
          taskId: "taskTestId"
        }])
      }))
    }
  }
}
