
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

  it('should get boards when getBoards method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const boards = await taskManagerRemoteService.getBoards("default");

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_TASK_MANAGER}.boards?roomId=default`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    );
    expect(boards).toStrictEqual([{}]);
  });

  it('should get sprint when getSprint method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const sprint = await taskManagerRemoteService.getSprint("default", "sprint1");

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_TASK_MANAGER}.sprint?roomId=default?tableId=sprint1`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
    );
    expect(sprint).toStrictEqual([{}]);
  });
})