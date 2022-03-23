
export const taskManagerRemoteService = {
  getBoards: (roomId: string): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.boards?roomId=${roomId}`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },
  getSprint: (roomId: string, tableId: string): Promise<any> => {
    return fetch(`${process.env.REACT_APP_TASK_MANAGER}.sprint?roomId=${roomId}?tableId=${tableId}`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
}