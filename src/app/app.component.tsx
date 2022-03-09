
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styles from './app.module.scss'
import BacklogComponent from './components/backlog/backlog.component';
import NavbarComponent from './components/navbar/navbar.component';
import TableComponent from './components/table/table.component';

export default function AppComponent() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path='/backlog' element={<BacklogComponent/>}/>
          <Route path='/table' element={<TableComponent/>}/>
          <Route path='*' element={<Navigate to="/backlog"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
