import React, { useState } from 'react'
import Left from './components/Left/Left'
import Logout from './components/Left/Logout'
import Right from './components/right/Right'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'

import { Navigate, Route, Routes, useNavigate } from "react-router"
import { BrowserRouter } from 'react-router'
import { useAuth } from './Context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'

export default function App() {
  const [auth,setAuth]=useAuth();


  // console.log(auth)
  return (
   <>
  

  <Toaster/>
<BrowserRouter>
   <Routes>
   
    <Route path='/signUp' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={ !auth? <Navigate to={'/login'}/>:
   <>
   <div className="flex">
     <Logout/>
   <Left/>
   <Right/>
   </div>
   </> }/>
   <Route path='/profile' element={   <Profile/>}/>
   <Route path='/editProfile' element={   <EditProfile/>}/>

   </Routes>
   </BrowserRouter>



  
   </>
  )
}
