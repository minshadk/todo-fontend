import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import CreateTodo from './pages/createTodo/CreateTodo'
import TodoDetails from './pages/todoDetails/TodoDetails'
import UpdateTodo from './pages/updateTodo/UpdateTodo'
import { useAuthContext } from './hooks/useAuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuthContext()

  return user ? children : <Navigate to="/login" />
}

function App() {
  const { user } = useAuthContext()
  const authToken = user ? user.token : null
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/createTodo"
            element={
              <PrivateRoute>
                <CreateTodo />
              </PrivateRoute>
            }
          />
          <Route
            path="/todoDetails/:todoId"
            element={
              <PrivateRoute>
                <TodoDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateTodo/:todoId"
            element={
              <PrivateRoute>
                <UpdateTodo />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
