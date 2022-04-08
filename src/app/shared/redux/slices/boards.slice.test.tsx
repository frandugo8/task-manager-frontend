import { Board } from '../../models/board.interface'
import reducer, { setBoards, addBoard, updateColumnPriority, updateTaskPriority, addTask } from './boards.slice'

const boardList = [
  {
    roomId: "default",
    id: "backlog",
    columns: [],
    tasks: [{
      id: "task4",
      title: "Fourth task",
      status: "to-do"
    }],
    start: new Date(),
    finish: new Date()
  }
]

const sprint = {
  roomId: "default",
  id: "sprint1",
  columns: [{
    id: "to-do",
    name: "To do",
    isInitial: true,
    isDone: false,
  },{
    id: "done",
    name: "Done",
    isInitial: false,
    isDone: true,
  }],
  tasks: [{
    id: "task1",
    title: "First task",
    status: "to-do"
  },{
    id: "task2",
    title: "Second task",
    status: "to-do"
  },{
    id: "task3",
    title: "Third task",
    status: "done"
  }],
  start: new Date(),
  finish: new Date()
}

const boardListWithNewTask = [{
  roomId: "default",
  id: "backlog",
  columns: [],
  tasks: [{
    id: "task4",
    title: "Fourth task",
    status: "to-do"
  },{
    id: "task10",
    title: "Tenth task",
    status: "to-do"
  }],
  start: new Date(),
  finish: new Date()
}]

const boardWithChangedPriorityColumns = {
  roomId: "default",
  id: "sprint1",
  columns: [{
    id: "done",
    name: "Done",
    isInitial: false,
    isDone: true,
  },{
    id: "to-do",
    name: "To do",
    isInitial: true,
    isDone: false,
  }],
  tasks: [{
    id: "task1",
    title: "First task",
    status: "to-do"
  },{
    id: "task2",
    title: "Second task",
    status: "to-do"
  },{
    id: "task3",
    title: "Third task",
    status: "done"
  }],
  start: new Date(),
  finish: new Date()
}

const boardListWithAddedTask = [{
  roomId: "default",
  id: "backlog",
  columns: [],
  tasks: [],
  start: new Date(),
  finish: new Date()
},{
  roomId: "default",
  id: "sprint1",
  columns: [{
    id: "to-do",
    name: "To do",
    isInitial: true,
    isDone: false,
  },{
    id: "done",
    name: "Done",
    isInitial: false,
    isDone: true,
  },],
  tasks: [{
    id: "task1",
    title: "First task",
    status: "to-do"
  },{
    id: "task4",
    title: "Fourth task",
    status: "to-do"
  },{
    id: "task2",
    title: "Second task",
    status: "to-do"
  },{
    id: "task3",
    title: "Third task",
    status: "done"
  }],
  start: new Date(),
  finish: new Date()
}]

const boardWithChangedPriorityTasksInSameColumn = {
  roomId: "default",
  id: "sprint1",
  columns: [{
    id: "to-do",
    name: "To do",
    isInitial: true,
    isDone: false,
  },{
    id: "done",
    name: "Done",
    isInitial: false,
    isDone: true,
  },],
  tasks: [{
    id: "task2",
    title: "Second task",
    status: "to-do"
  },{
    id: "task1",
    title: "First task",
    status: "to-do"
  },{
    id: "task3",
    title: "Third task",
    status: "done"
  }],
  start: new Date(),
  finish: new Date()
}

const boardWithChangedPriorityTasksInDifferentColumn = {
  roomId: "default",
  id: "sprint1",
  columns: [{
    id: "to-do",
    name: "To do",
    isInitial: true,
    isDone: false,
  },{
    id: "done",
    name: "Done",
    isInitial: false,
    isDone: true,
  },],
  tasks: [{
    id: "task2",
    title: "Second task",
    status: "to-do"
  },{
    id: "task1",
    title: "First task",
    status: "done"
  },{
    id: "task3",
    title: "Third task",
    status: "done"
  }],
  start: new Date(),
  finish: new Date()
}

describe("BoardsSlice", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual([])
  })

  it('should add task to desired board', () => {
    const previousState = boardList
    const task = {
      id: "task10",
      title: "Tenth task",
      status: "to-do"
    }
  
    expect(reducer(previousState, addTask({boardId: "backlog", task}))).toEqual(boardListWithNewTask)
  })
  
  it('should add board to current list', () => {
    const previousState = boardList
  
    expect(reducer(previousState, addBoard({board: sprint}))).toEqual([...boardList, sprint])
  })
  
  it('should set boards list', () => {
    const previousState: Array<Board> = []
  
    expect(reducer(previousState, setBoards({boards: boardList}))).toEqual(boardList)
  })
  
  it('should update column priority', () => {
    const previousState: Array<Board> = [...boardList, sprint]
  
    expect(reducer(previousState, updateColumnPriority({
      source: { droppableId: "sprint1", index: 0 },
      destination: { droppableId: "sprint1", index: 1 }
    }))).toEqual([...boardList, boardWithChangedPriorityColumns])
  })
  
  it('should update task priority from different boards', () => {
    const previousState: Array<Board> = [...boardList, sprint]

    expect(reducer(previousState, updateTaskPriority({
      source: { droppableId: "backlog", index: 0 },
      destination: { droppableId: "sprint1", index: 1 },
    }))).toEqual(boardListWithAddedTask)
  })

  it('should update task priority from same board and same column', () => {
    const previousState: Array<Board> = [...boardList, sprint]
  
    expect(reducer(previousState, updateTaskPriority({
      source: { droppableId: "to-do", index: 0 },
      destination: { droppableId: "to-do", index: 1 },
      boardId: "sprint1",
      adjacentId: "task2",
      taskId: "task1"
    }))).toEqual([...boardList, boardWithChangedPriorityTasksInSameColumn])
  })

  it('should update task priority from same board and different column', () => {
    const previousState: Array<Board> = [...boardList, sprint]
  
    expect(reducer(previousState, updateTaskPriority({
      source: { droppableId: "to-do", index: 0 },
      destination: { droppableId: "done", index: 0 },
      boardId: "sprint1",
      adjacentId: "task3",
      taskId: "task1"
    }))).toEqual([...boardList, boardWithChangedPriorityTasksInDifferentColumn])
  })
})



