import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { DraggableLocation } from "react-beautiful-dnd";
import { Board } from "../../models/board.interface";
import { Task } from "../../models/task.interface";

const initialState: Array<Board> = []

const boardsSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{board: Board}>) => {
      state.push(action.payload.board)
    },
    setBoards: (_, action: PayloadAction<{boards: Array<Board>}>) => {
      return action.payload.boards
    },
    updateColumnPriority: (state, action: PayloadAction<{source: DraggableLocation, destination: DraggableLocation}>) => {
      const { source, destination} = action.payload

      state.map((board: Board) => {
        if (board.id === source.droppableId) {
          const [removed] = board.columns.splice(source.index, 1)
          board.columns.splice(destination.index, 0, removed)
        }

        return board
      })
    },
    updateTaskPriority: (state, action: PayloadAction<{source: DraggableLocation, destination: DraggableLocation, boardId?: string, adjacentId?: string, taskId?: string}>) => {
      const { source, destination, boardId, adjacentId, taskId} = action.payload
      let removed: Array<Task> | undefined = undefined

      if (boardId !== undefined && taskId) {
        state.map((board: Board) => {
          if (board.id === boardId) {
            board.tasks = board.tasks.map((task: Task) => {
              if (task.id === taskId) {
                task.status = destination.droppableId
              }

              return task
            })

            if (adjacentId) {
              const taskIndex = board.tasks.findIndex((task: Task) => task.id === taskId)
              const adjacentIndex = board.tasks.findIndex((task: Task) => task.id === adjacentId)
  
              removed = board.tasks?.splice(taskIndex, 1)

              const result = destination.index === 0? adjacentIndex : adjacentIndex + 1
              board.tasks?.splice(result, 0, ...removed)
            }
          }

          return board
        })
      } else if (boardId === undefined) {
        state.map((board: Board) => {
          if (board.id === source.droppableId) {
            removed = board.tasks?.splice(source.index, 1)
          }
  
          return board
        })
  
        if (removed !== undefined) {
          state.map((board: Board) => {
            if (board.id === destination.droppableId && removed !== undefined) {
              board.tasks?.splice(destination.index, 0, ...removed)
            }
    
            return board
          })
        }
      }
    }
  }
})

export const { setBoards, addBoard, updateColumnPriority, updateTaskPriority } = boardsSlice.actions


export default boardsSlice.reducer