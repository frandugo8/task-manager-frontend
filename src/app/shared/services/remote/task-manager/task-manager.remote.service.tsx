
export const taskManagerRemoteService = {
  getBoards: (roomId: string): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.boards?roomId=${roomId}`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },
  updateColumnPriority: (
    roomId: string,
    boardId: string,
    origin: {columnId: string},
    destination: {index: number}): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.column-priority?roomId=${roomId}&boardId=${boardId}`, {
      method: "PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({origin, destination})
    })
  },
  updateTaskPriority: (
    roomId: string,
    origin: {boardId: string, taskId: string},
    destination: {boardId: string, adjacentId: string, isFirst: boolean}): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.task-priority?roomId=${roomId}`, {
      method: "PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({origin, destination})
    })
  }
}