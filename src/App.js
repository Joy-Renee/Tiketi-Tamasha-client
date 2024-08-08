
import './App.css'
import React, { } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import LoginForm from './Components/LoginForm'
import Register from './Components/Register'


function App () {
  return (
    <div className='vh-100 gradient-custom'>
      <div className='container'>
        <h1 className='page-header text-center'>Ticketi Tamasha</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
