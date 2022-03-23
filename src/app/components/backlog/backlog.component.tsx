
import { useEffect } from 'react'
import { taskManagerRemoteService } from '../../shared/services/remote/task-manager/task-manager.remote.service'
import styles from './backlog.module.scss'
import SprintComponent from './components/sprint/sprint.component'

export default function BacklogComponent() {
  useEffect(() => {
    taskManagerRemoteService.getBoards("default").then(async (response) => {
      const data = await response.json()
      //TODO:: dispatch to redux
   })
  }, [])

  return (
    <div className={styles.backlog}>
      <SprintComponent/>
    </div>
  )
}
