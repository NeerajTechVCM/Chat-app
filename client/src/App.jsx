import React, { useState } from 'react'
import Left from './components/Left/Left'
import Logout from './components/Left/Logout'
import Right from './components/right/Right'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Cookies from 'js-cookie';
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router"
import { BrowserRouter } from 'react-router'
import { useAuth } from './Context/AuthProvider'
import { Toaster } from 'react-hot-toast'


export default function App() {
  
  const token = Cookies.get('jwt');
  console.log(token)
const navigate = useNavigate();
const location = useLocation(); 
  useEffect(()=>{
    if (!token && location.pathname !== '/login' && location.pathname !== '/signUp') {
          navigate('/login');
        }
    
    
    },[navigate,location,token])


  return (
   <>
  

  <Toaster/>

   <Routes>
   
    <Route path='/signUp' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={ 
   <>
   <div className="flex">
     <Logout/>
   <Left/>
   <Right/>
   </div>
   </> }/>


   </Routes>
  



  
   </>
  )
}
