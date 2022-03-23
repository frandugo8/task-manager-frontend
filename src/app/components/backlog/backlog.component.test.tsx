
import "@testing-library/react"
import ReactDOM from "react-dom"
import BacklogComponent from "./backlog.component";
import { render } from '@testing-library/react';
import { taskManagerRemoteService } from "../../shared/services/remote/task-manager/task-manager.remote.service";


let spies: any
describe("BacklogComponent", () => {
  beforeEach(() => {
    loadSpies();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BacklogComponent />, div);
  });

  it('must load initial boards data', async () => {
    render(<BacklogComponent />)
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
