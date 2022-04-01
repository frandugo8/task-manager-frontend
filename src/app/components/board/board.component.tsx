import { useEffect, useRef, useState } from 'react';
import styles from './board.module.scss'
import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult } from "react-beautiful-dnd";
import { Column } from '../../shared/models/column.interface';
import BoardListComponent from './components/board-list/board-list.component';
import { useAppSelector } from '../../shared/redux/store/store';
import { RootState } from '../../shared/redux/rootReducer';
import { taskManagerRemoteService } from '../../shared/services/remote/task-manager/task-manager.remote.service';
import { Board } from '../../shared/models/board.interface';
import { Task } from '../../shared/models/task.interface';
import { useDispatch } from 'react-redux';
import { updateColumnPriority, updateTaskPriority } from '../../shared/redux/slices/boards.slice';

export default function BoardComponent() {
  const boardId = "sprint1"
  const board = useAppSelector((state: RootState) => state.boards.find((board: Board) => board.id === boardId))
  const [columns, setColumns] = useState<Array<Column>>([])
  const dispatch = useDispatch()

  const isLoad = useRef<boolean>(false)

  useEffect(() => {
    if (board && !isLoad.current) {
      setColumns(board.columns.map((column: Column) => {
        return {...column, tasks: board.tasks.filter((task: Task) => task.status === column.id)}
      }))

      isLoad.current = true
    }
  }, [board])

  const handleTaskPriorityChange = (destination: DraggableLocation, source: DraggableLocation): void => {
    const columnsCopy = JSON.parse(JSON.stringify(columns))
    const sourceIndex = columns.findIndex((column) => column.id === source?.droppableId)
    const destinationIndex = columns.findIndex((column) => column.id === destination?.droppableId)
    const sourceColumnTasks = columns.find((column: Column) => column.id === source.droppableId)?.tasks
    const destinationColumnTasks = columns.find((column: Column) => column.id === destination.droppableId)?.tasks

    if (sourceIndex !== undefined && destinationIndex !== undefined) {
      const removed = columnsCopy[sourceIndex].tasks?.splice(source.index, 1)

      if (removed !== undefined) {
        columnsCopy[destinationIndex].tasks?.splice(destination.index, 0, ...removed)
      }

      if (sourceColumnTasks && destinationColumnTasks) {
        setColumns(columnsCopy)
  
        if (sourceColumnTasks && destinationColumnTasks) {
          const adjacentTask = destinationColumnTasks[destination.index === 0? destination.index : destination.index - 1]
          const task = sourceColumnTasks[source.index]

          dispatch(updateTaskPriority({source, destination, boardId, adjacentId: adjacentTask? adjacentTask.id : undefined, taskId: task? task.id : undefined}))
        }

        const origin = {
          boardId,
          taskId: sourceColumnTasks[source.index]?.id
        }

        const dest = {
          boardId,
          columnId: destination.droppableId,
          adjacentId: destinationColumnTasks[destination.index]?.id,
          isFirst: destination.index === 0
        }

        taskManagerRemoteService.updateTaskPriority("default", origin, dest)
      }
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const { source, destination, type } = result

      if (type === "column") {
        const origin = {
          columnId: columns[source.index].id
        }
    
        const dest = {
          index: destination.index
        }

        dispatch(updateColumnPriority({source, destination}))
        taskManagerRemoteService.updateColumnPriority("default", boardId, origin, dest)
      } else {
        handleTaskPriorityChange(destination, source)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Droppable type="column" direction="horizontal" droppableId={boardId}>
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
