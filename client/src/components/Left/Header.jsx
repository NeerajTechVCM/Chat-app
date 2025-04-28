import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuth } from '@/Context/AuthProvider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { FiLogOut } from "react-icons/fi";

import toast, { Toaster } from 'react-hot-toast';
import Profile from '../profile/Profile';

export default function Header() {
  const [auth,setAuth]=useAuth();
  async function handleLogout(){

    const result = await fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
   
      credentials: 'include',
    });
    const data = await result.json();
 
    if (data.success) {
  
  
      navigate("/login");
      
      toast.success(data.msg)
  
    } else {
      navigate("/");
    
    }
    
  }
  return (
    <>
    <Toaster/>
      <div className="flex justify-between p-2 items-center mt-2">
        <h1 className='text-2xl font-bold'>ChatApp</h1>
        <span>
          <Popover>
            <PopoverTrigger> <HiOutlineDotsVertical style={{ fontSize: '25px' }} /></PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col justify-between items- space-y-5">
                <div className="flex justify-center items-center space-x-3">
                  <Label htmlFor="logout"> <FiLogOut style={{ fontSize: "25px" }} onClick={handleLogout} /></Label>
                  <span id='logout' onClick={handleLogout}>Logout</span>
                </div>
                <div className="flex justify-center items-center space-x-3">

                   <Label htmlFor="profile">  <Profile/></Label>
             
                  <p>Profile</p>
                </div>

              </div>
            </PopoverContent>
          </Popover>



        </span>

      </div>

    </>
  )
}
