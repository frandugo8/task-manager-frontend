
import "@testing-library/react"
import { taskManagerRemoteService } from "./task-manager.remote.service";

describe("TaskManagerRemoteService", () => {
  let fetch: typeof global.fetch;

  beforeAll(() => {
    fetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = fetch;
  });

  it('should get tasks when getTasks method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const tasks = await taskManagerRemoteService.getTasks();

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TASKS_URI}`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    );
    expect(tasks).toStrictEqual([{}]);
  });
})