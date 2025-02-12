import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './user/HomePage';
import RegisterPage from './user/Register components/RegisterPage';
import LoginPage from './user/Login components/LoginPage';
import Navbar from './user/Navbar'
import Dashboard from './user/Dashboard';

function App() {
  

  return (
    <>
    <Navbar />
      <Routes>
        <Route path = '/' element = { <HomePage/>} />
        <Route path = 'login' element = { <LoginPage/>} />
        <Route path = 'register' element = { <RegisterPage/>} />
        <Route path = 'Dashboard' element = { <Dashboard/>} />
      </Routes>
    </>
  )
}

export default App
