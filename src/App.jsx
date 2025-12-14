import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CourseList from './pages/CourseList'
import CourseDetail from './pages/CourseDetail'
import Login from './pages/Login'
import NavBar from './components/layouts/NavBar'
import Register from './pages/Register'
import CourseUser from './pages/CourseUser'
import ListUnitsFromCourse from './pages/ListUnitsFromCourse'
import UnitDetail from './pages/UnitDetail'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/courses' element={<CourseUser />}></Route>
          <Route path='/courses/:id/' element={<CourseDetail />}></Route>
          <Route path='/enroll' element={<CourseList />}></Route>
          <Route path='/courses/:courseId/units' element={<ListUnitsFromCourse />}></Route>
          <Route path='/units/:unitId' element={<UnitDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App