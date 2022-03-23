import { useState } from 'react';
import styles from './table.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import TableListComponent from './components/table-list/table-list.component';
import { BoardColumn } from '../../shared/models/board-column.interface';
import { Task } from '../../shared/models/task.interface';

export default function TableComponent() {
  const tasks: Array<Task> = [
    { id: "1", title: "First task" },
    { id: "2", title: "Second task" },
    { id: "3", title: "Third task" },
    { id: "4", title: "Fourth task" },
    { id: "5", title: "Fifth task" }
  ];

  const columnsFromBackend: Array<BoardColumn> = [
    {
      id: "todo",
      name: "Por hacer",
      tasks: tasks
    },
    {
      id: "in-progress",
      name: "En curso",
      tasks: []
    },
    {
      id: "in-revision",
      name: "Revisión",
      tasks: []
    },
    {
      id: "done",
      name: "Listo",
      tasks: []
    }
  ]

  const [columns, setColumns] = useState<Array<BoardColumn>>(columnsFromBackend);


  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const { source, destination, type } = result

      if (type === "column") {
        const columnsCopy = columns.slice()
        const [removed] = columnsCopy.splice(source.index, 1)
        columnsCopy.splice(destination.index, 0, removed)
  
        setColumns(columnsCopy)
      } else {
        // if (source.droppableId !== destination.droppableId)

        const columnsCopy = columns.slice()
        const sourceIndex = columns.findIndex((column) => column.id === result.source?.droppableId)
        const destinationIndex = columns.findIndex((column) => column.id === result.destination?.droppableId)

        if (sourceIndex !== undefined && destinationIndex !== undefined) {
          const [removed] = columnsCopy[sourceIndex].tasks.splice(source.index, 1)
          columnsCopy[destinationIndex].tasks.splice(destination.index, 0, removed)

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
                    <TableListComponent column={column}/>
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
