
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { Board } from '../../shared/models/board.interface'
import { RootState } from '../../shared/redux/rootReducer'
import { updateTaskPriority } from '../../shared/redux/slices/boards.slice'
import { useAppSelector } from '../../shared/redux/store/store'
import styles from './backlog.module.scss'
import SprintComponent from './components/sprint/sprint.component'

export default function BacklogComponent() {
  const boards = useAppSelector((state: RootState) => state.boards)
  const dispatch = useDispatch()

  const onDragEnd = (result: DropResult): void => {
    if (result.destination !== undefined) {
      dispatch(updateTaskPriority({source: result.source, destination: result.destination}))
    }
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <div className={styles.backlog}>
        {boards.map((board: Board, index: number) => 
          <SprintComponent board={board} key={index}/>
        )}
      </div>
    </DragDropContext>
  )
}
