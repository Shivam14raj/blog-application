import React from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/Blog'

const App = () => {
  return (
    <>
    <Navbar/> 
    <Routes>
      <Route path='/login' element= {<Login/>} />
      <Route path='/register' element= {<Register/>} />
      <Route path='/' element= {<Blog/>} />  
      <Route path='/blogs' element= {<Blog/>} />  
    </Routes>
    </>
    
  )  
}

export default App  
