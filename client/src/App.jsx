import React from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/Blog'
import UserBlogs  from './pages/UserBlogs.jsx'

const App = () => {
  return (
    <>
    <Navbar/> 
    <Routes>
      <Route path='/login' element= {<Login/>} />
      <Route path='/register' element= {<Register/>} />
      <Route path='/' element= {<Blog/>} />  
      <Route path='/blogs' element= {<Blog/>} /> 
      <Route path='/my-blogs' element= {<UserBlogs/>} /> 
    </Routes>
    </>
    
  )  
}

export default App  
