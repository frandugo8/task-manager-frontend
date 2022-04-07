import { useEffect, useRef, useState } from 'react';
import styles from './backlog.module.scss'
import { DragDropContext, DraggableLocation, DropResult } from "react-beautiful-dnd";
import { Column } from '../../shared/models/column.interface';
import { useAppSelector } from '../../shared/redux/store/store';
import { RootState } from '../../shared/redux/rootReducer';
import { taskManagerRemoteService } from '../../shared/services/remote/task-manager/task-manager.remote.service';
import { Board } from '../../shared/models/board.interface';
import { Task } from '../../shared/models/task.interface';
import { useDispatch } from 'react-redux';
import { updateTaskPriority } from '../../shared/redux/slices/boards.slice';
import BoardListComponent from '../board/components/board-list/board-list.component';
import SprintComponent from './components/sprint/sprint.component';

export default function BacklogComponent() {
  const boards = useAppSelector((state: RootState) => state.boards)
  const boardId = "sprint1"
  const dispatch = useDispatch()
  
  const onDragEnd = (result: DropResult): void => {
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
  
        taskManagerRemoteService.updateTaskPriority("default", origin, dest)
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
