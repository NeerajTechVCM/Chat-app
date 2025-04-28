import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from './Context/AuthProvider';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import EditProfile from './components/profile/EditProfile';
import Logout from './components/Left/Logout';
import Left from './components/Left/Left';
import Right from './components/right/Right';
import { Toaster } from 'react-hot-toast';

import Cookies from 'js-cookie';

export default function App() {
  const [auth] = useAuth();
  const token = Cookies.get('jwt');
  const navigate = useNavigate();
  const location = useLocation(); 
  useEffect(()=>{
  if (!token && location.pathname !== '/login' && location.pathname !== '/signUp') {
        navigate('/login');
      }
  
  
  },[navigate,location,token])
  return (
   <>
      <Toaster />
    
        <Routes>
          <Route path='/signUp' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route 
            path='/' 
            element={
              
                <div className="flex">
                  <Logout />
                  <Left />
                  <Right />
                </div>
              
            }
          />
          <Route path='/editProfile' element={<EditProfile />} />
        </Routes>
   
  </>
  );
}
