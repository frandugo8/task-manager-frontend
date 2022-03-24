
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardColumn } from '../../../../shared/models/board-column.interface'
import { Task } from '../../../../shared/models/task.interface'
import styles from './board-list.module.scss'

interface BoardListProps {
  column: BoardColumn
}

export default function BoardListComponent({column}: BoardListProps) {
  return (
    <Droppable type="row" droppableId={column.id} key={column.id}>
      {(provided) => 
        <div className={styles.content} {...provided.droppableProps} ref={provided.innerRef}>
          {column.tasks?.map((task: Task, index: number) => 
            <Draggable
              key={task.id}
              draggableId={task.id}
              index={index}>
                {(provided) => 
                  <div
                    className={styles.task}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{...provided.draggableProps.style}}>
                      {task.title}
                  </div>
                }
            </Draggable>
          )}
          {provided.placeholder}
        </div>
      }
    </Droppable>
  )
}
