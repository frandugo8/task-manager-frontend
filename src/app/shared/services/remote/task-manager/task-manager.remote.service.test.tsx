
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

  it('should update column priority when updateColumnPriority method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const roomId = "default"
    const boardId = "sprint1"    
    const origin = {columnId: "to-do"}
    const destination = {index: 1}
    const boards = await taskManagerRemoteService.updateColumnPriority(roomId, boardId, origin, destination);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_TASK_MANAGER}.column-priority?roomId=${roomId}&boardId=${boardId}`,
      expect.objectContaining({
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({origin, destination})
      })
    );
    expect(boards).toStrictEqual([{}]);
  });

  it('should update task priority when updateTaskPriority method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const roomId = "default"
    const origin = {boardId: "to-do", taskId: "task1"}
    const destination = {boardId: "to-do", adjacentId: "task2", columnId: "to-do", index: 0}
    const boards = await taskManagerRemoteService.updateTaskPriority(roomId, origin, destination);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_TASK_MANAGER}.task-priority?roomId=${roomId}`,
      expect.objectContaining({
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({origin, destination})
      })
    );
    expect(boards).toStrictEqual([{}]);
  });
})