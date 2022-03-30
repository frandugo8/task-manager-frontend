import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../models/board.interface";

const initialState: Array<Board> = []

const boardsSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (_, action: PayloadAction<{boards: Array<Board>}>) => {
      return action.payload.boards
    },
    addBoard: (state, action: PayloadAction<{board: Board}>) => {
      state.push(action.payload.board)
    }
  }
})

export const { setBoards, addBoard } = boardsSlice.actions


export default boardsSlice.reducer