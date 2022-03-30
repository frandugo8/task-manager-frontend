import { useEffect, useState } from 'react';
import styles from './board.module.scss'
import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult } from "react-beautiful-dnd";
import { Column } from '../../shared/models/column.interface';
import BoardListComponent from './components/board-list/board-list.component';
import { useAppSelector } from '../../shared/redux/store/store';
import { RootState } from '../../shared/redux/rootReducer';
import { taskManagerRemoteService } from '../../shared/services/remote/task-manager/task-manager.remote.service';
import { Board } from '../../shared/models/board.interface';
import { Task } from '../../shared/models/task.interface';

export default function BoardComponent() {
  const boards = useAppSelector((state: RootState) => state.boards)
  const [columns, setColumns] = useState<Array<Column>>([])

  useEffect(() => {
    const boardId = "sprint1"
    const board = boards.find((board: Board) => board.id === boardId)

    if (board) {
      setColumns(board.columns.map((column: Column) => {
        return {...column, tasks: board.tasks.filter((task: Task) => task.status === column.id)}
      }))
    }
  }, [boards])

  const handleColumnPriorityChange = (destination: DraggableLocation, source: DraggableLocation): void => {
    const columnsCopy = columns.slice()
    const [removed] = columnsCopy.splice(source.index, 1)
    columnsCopy.splice(destination.index, 0, removed)

    setColumns(columnsCopy)

    const origin = {
      columnId: columns[source.index].id
    }

    const dest = {
      index: destination.index
    }

    taskManagerRemoteService.updateColumnPriority("default", "sprint1", origin, dest)
  }

  const handleTaskPriorityChange = (destination: DraggableLocation, source: DraggableLocation): void => {
    const boardId = "sprint1"
    const columnsCopy = JSON.parse(JSON.stringify(columns))
    const sourceIndex = columns.findIndex((column) => column.id === source?.droppableId)
    const destinationIndex = columns.findIndex((column) => column.id === destination?.droppableId)
    const originColumnTasks = columns.find((column: Column) => column.id === source.droppableId)?.tasks
    const destTaskColumnTasks = columns.find((column: Column) => column.id === destination.droppableId)?.tasks

    if (sourceIndex !== undefined && destinationIndex !== undefined) {
      const removed = columnsCopy[sourceIndex].tasks?.splice(source.index, 1)

      if (removed !== undefined) {
        columnsCopy[destinationIndex].tasks?.splice(destination.index, 0, ...removed)
      }

      if (originColumnTasks && destTaskColumnTasks) {
        const origin = {
          boardId,
          taskId: originColumnTasks[source.index]?.id
        }

        const dest = {
          boardId,
          columnId: destination.droppableId,
          adjacentId: destTaskColumnTasks[destination.index]?.id,
          isFirst: destination.index === 0
        }

        setColumns(columnsCopy)

        taskManagerRemoteService.updateTaskPriority("default", origin, dest)
      }
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const { source, destination, type } = result

      if (type === "column") {
        handleColumnPriorityChange(destination, source)
      } else {
        handleTaskPriorityChange(destination, source)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Droppable type="column" direction="horizontal" droppableId="board">
        {(provided) => (
          <div
            id="parent-scroll-cont"
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.boards}
          >
            {columns.map((column: Column, index: number) => 
              <Draggable
                key={column.id}
                draggableId={`${column.id}-horiz`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={styles.board}
                  >
                    <div
                      className={styles.board__header}
                      {...provided.dragHandleProps}>{column.name}
                    </div>
                    <BoardListComponent column={column}/>
                  </div>
                )}
              </Draggable>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
