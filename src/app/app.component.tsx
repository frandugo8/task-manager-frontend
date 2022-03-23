
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styles from './app.module.scss'
import BacklogComponent from './components/backlog/backlog.component';
import NavbarComponent from './components/navbar/navbar.component';
import BoardComponent from './components/board/board.component';

export default function AppComponent() {
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
