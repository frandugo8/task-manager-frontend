import { useEffect, useState } from 'react';
import styles from './board.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { BoardColumn } from '../../shared/models/board-column.interface';
import { Task } from '../../shared/models/task.interface';
import BoardListComponent from './components/board-list/board-list.component';
import { useAppSelector } from '../../shared/redux/store/store';
import { RootState } from '../../shared/redux/rootReducer';
import { taskManagerRemoteService } from '../../shared/services/remote/task-manager/task-manager.remote.service';
import { Board } from '../../shared/models/board.interface';


export default function BoardComponent() {
  const [columns, setColumns] = useState<Array<BoardColumn>>([])
  const boards = useAppSelector((state: RootState) => state.boards)

  useEffect(() => {
    const tableId = "sprint1"

    taskManagerRemoteService.getSprint("default", tableId).then(async (response) => {
      const columnsData: Array<BoardColumn> = await response.json()

      setColumns(columnsData.map((column: BoardColumn) => {
        column.tasks = boards.find((board: Board) => board.id === tableId)?.tasks.filter((task: Task) => task.status === column.id)
        return column
      }))
    })
  }, [boards])

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const { source, destination, type } = result

      if (type === "column") {
        const columnsCopy = columns.slice()
        const [removed] = columnsCopy.splice(source.index, 1)
        columnsCopy.splice(destination.index, 0, removed)
  
        setColumns(columnsCopy)
      } else {
        const columnsCopy = columns.slice()
        const sourceIndex = columns.findIndex((column) => column.id === result.source?.droppableId)
        const destinationIndex = columns.findIndex((column) => column.id === result.destination?.droppableId)

        if (sourceIndex !== undefined && destinationIndex !== undefined) {
          const removed = columnsCopy[sourceIndex].tasks?.splice(source.index, 1)

          if (removed !== undefined) {
            columnsCopy[destinationIndex].tasks?.splice(destination.index, 0, ...removed)
          }

          setColumns(columnsCopy)
        }
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
            {columns.map((column: BoardColumn, index: number) => 
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
