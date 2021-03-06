
import { useState } from 'react'
import CreateTaskComponent from '../../shared/components/create-task/create-task.component'
import styles from './sprint.module.scss'

export default function SprintComponent() {

  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  // const startSprint = (): void => {

  // }

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

      {!isDropdownVisible?
        <div className={styles.tasks}>
          <div className={styles.defaultList}>
              Planifica un sprint arrastrando el pie de página de sprint debajo de las incidencias correspondientes o arrastrando las incidencias hasta aquí.
          </div>
        </div>
        
      : <ul className={styles.list}>
        <li className={styles.task}>Task 1</li>
      </ul>}

      <CreateTaskComponent/>
    </div>
  )
}
