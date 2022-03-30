
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styles from './app.module.scss'
import BacklogComponent from './components/backlog/backlog.component';
import NavbarComponent from './components/navbar/navbar.component';
import BoardComponent from './components/board/board.component';
import { useEffect } from 'react';
import { taskManagerRemoteService } from './shared/services/remote/task-manager/task-manager.remote.service';
import { useAppDispatch } from './shared/redux/store/store';
import { setBoards } from './shared/redux/slices/boards.slice';
import { Board } from './shared/models/board.interface';

export default function AppComponent() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    taskManagerRemoteService.getBoards("default").then(async (response) => {
      const boards: Array<Board> = await response.json()
      dispatch(setBoards({boards}))
   })
  }, [dispatch])

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path='/backlog' element={<BacklogComponent/>}/>
          <Route path='/board' element={<BoardComponent/>}/>
          <Route path='*' element={<Navigate to="/backlog"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
