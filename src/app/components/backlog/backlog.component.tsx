import { useEffect } from 'react';
import { DropResult, DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Board } from '../../shared/models/board.interface';
import { RootState } from '../../shared/redux/rootReducer';
import { updateTaskPriority } from '../../shared/redux/slices/boards.slice';
import { useAppSelector } from '../../shared/redux/store/store';
import { taskManagerRemoteService } from '../../shared/services/remote/task-manager/task-manager.remote.service';
import styles from './backlog.module.scss'
import SprintComponent from './components/sprint/sprint.component';

export default function BacklogComponent() {
  const boardId = "sprint1"
  const boards = useAppSelector((state: RootState) => state.boards)
  const dispatch = useDispatch()

  const onDragEnd = async (result: DropResult): Promise<any> => {
    if (result.destination !== undefined) {
      const task = boards.find((board) => board.id === result.source?.droppableId)?.tasks[result.source.index]
      const adjacent = boards.find((board) => board.id === result.destination?.droppableId)?.tasks[result.destination.index]
  
      if (task) {
        const origin = {
          boardId: result.source.droppableId,
          taskId: task.id
        }
  
        const dest = {
          boardId: result.destination.droppableId,
          columnId: result.destination.droppableId,
          adjacentId: adjacent? adjacent.id : undefined,
          index: result.destination.index
        }
  
        await taskManagerRemoteService.updateTaskPriority("default", origin, dest)
      }

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
