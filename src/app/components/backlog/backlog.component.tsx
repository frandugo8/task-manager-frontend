
import styles from './backlog.module.scss'
import SprintComponent from './components/sprint/sprint.component'

export default function BacklogComponent() {
  return (
    <div className={styles.backlog}>
      <SprintComponent/>
    </div>
  )
}
