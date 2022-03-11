
import { Task } from '../../models/task.interface'
import styles from './task.module.scss'

interface TaskProps {
  task: Task
  style?: React.CSSProperties
}

export default function TaskComponent({task, style}: TaskProps) {
  return (
    <div
      data-test-id="task"
      className={styles.task}
      style={style}>
      <div className={styles.task__type}/>
      <div className={styles.task__id}>{task.id}</div>
      <div className={styles.task__title}>{task.title}</div>
    </div>
  )
}
