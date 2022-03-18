import { Board } from '../../models/board.interface'
import reducer, { setBoards, addBoard } from './boards.slice'

const boardList = [
  {
    roomId: "default",
    id: "backlog",
    columns: [],
    tasks: [],
    start: new Date(),
    finish: new Date()
  }
]

const board = {
  roomId: "default",
  id: "sprint1",
  columns: [],
  tasks: [],
  start: new Date(),
  finish: new Date()
}

test('should return the initial state', () => {
  expect(reducer(undefined, {type: undefined})).toEqual([])
})

test('should set boards list', () => {
  const previousState: Array<Board> = []

  expect(reducer(previousState, setBoards({boards: boardList}))).toEqual(boardList)
})

test('should add board to current list', () => {
  const previousState = boardList

  expect(reducer(previousState, addBoard({board: board}))).toEqual([...boardList, board])
})