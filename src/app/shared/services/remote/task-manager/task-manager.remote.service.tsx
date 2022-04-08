
export const taskManagerRemoteService = {
  getBoards: (roomId: string): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.boards?roomId=${roomId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },
  updateColumnPriority: (
    roomId: string,
    boardId: string,
    source: {columnId: string},
    destination: {index: number}): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.column-priority?roomId=${roomId}&boardId=${boardId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({source, destination})
    })
  },
  updateTaskPriority: (
    roomId: string,
    source: {boardId: string, taskId: string},
    destination: {boardId: string, columnId: string, index: number, adjacentId?: string},
    boardId?: string): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.task-priority?roomId=${roomId}${boardId? `&boardId=${boardId}` : ""}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({source, destination})
    })
  }
}