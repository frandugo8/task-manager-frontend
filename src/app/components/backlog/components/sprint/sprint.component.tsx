
import { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskComponent from '../../../../shared/components/task/task.component'
import { Board } from '../../../../shared/models/board.interface'
import { Column } from '../../../../shared/models/column.interface'
import { Task } from '../../../../shared/models/task.interface'
import CreateTaskComponent from '../../shared/components/create-task/create-task.component'
import styles from './sprint.module.scss'

interface SprintComponentProps {
  board: Board
}

export default function SprintComponent({board}: SprintComponentProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(true)

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  const completeSprint = (): void => {

  }

  return (
    <div className={styles.sprint}>
      <div className={styles.header}>

        <div data-testid="details-element" className={styles.details} onClick={toggleDropdown}>
          <button type="button" className={styles.dropdown}>
            <span className={styles.dropdown__icon}/>
          </button>

          <div className={styles.title}>{`Sprint ${1}`}</div>

          <div className={styles.date}>2 mar - 16 mar</div>

          <div className={styles.tasksLength}>(2 incidencias)</div>
        </div>

        <button type="button" className={styles.startFinishButton} onClick={completeSprint}>Completar sprint</button>
      </div>
      
      {isDropdownVisible?
        <Droppable type="row" droppableId={board.id} key={board.id}>
          {(provided) => 
            <div className={styles.tasks}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board.tasks.length > 0? board.tasks.map((task: Task, index: number) => 
                <Draggable
                  key={task.id}
                  draggableId={task.id}
                  index={index}>
                    {(provided) => 
                      <div
                        className={styles.task}
                        ref={provided.innerRef}
                        data-testid={task.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style}}>
                          <TaskComponent task={task}/>
                      </div>
                    }
                </Draggable>
              )
              : <div className={styles.defaultList}>
                  Planifica un sprint arrastrando el pie de página de sprint debajo de las incidencias correspondientes o arrastrando las incidencias hasta aquí.
              </div>}
              {provided.placeholder}
            </div>
          }
      </Droppable> : ""}

      <CreateTaskComponent/>

    </div>
    
  )
}