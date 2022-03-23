

import { combineReducers } from '@reduxjs/toolkit'
import boardsSlice from './slices/boards.slice'


const reducer = combineReducers({
  boards: boardsSlice
})

export default reducer

export type RootState = ReturnType<typeof reducer>