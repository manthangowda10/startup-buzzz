import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './user/HomePage';
import RegisterPage from './user/RegisterPage';
import LoginPage from './user/LoginPage';
import Navbar from './user/Navbar'

function App() {
  

  return (
    <>
    <Navbar />
      <Routes>
        <Route path = '/' element = { <HomePage/>} />
        <Route path = 'login' element = { <LoginPage/>} />
        <Route path = 'register' element = { <RegisterPage/>} />
      </Routes>
    </>
  )
}

export default App
