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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import toast, { Toaster } from 'react-hot-toast';

export default function Header() {
  const [auth,setAuth]=useAuth();
  function handleLogout(){

    localStorage.clear();
    setAuth();
    toast.success("Logout successfully")
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

                <a  href="/profile" className='cursor-pointer'>     <Label htmlFor="profile">   <Avatar>
         <AvatarImage src={ auth.image?auth.image:''} />
         <AvatarFallback>
         {auth.username ? auth.username.charAt(0).toUpperCase() : 'CN'}
       </AvatarFallback>
                  </Avatar></Label></a>
             
                  <a id='profile' href="/profile" className='cursor-pointer'>Profile</a>
                </div>

              </div>
            </PopoverContent>
          </Popover>



        </span>

      </div>

    </>
  )
}
