import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MdChat } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import { useAuth } from '@/Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import Profile from '../profile/Profile';


export default function Logout() {

 const [auth,setAuth]=useAuth();
// console.log(auth)
  function handleLogout(){

    localStorage.clear();
    setAuth();
    toast.success("Logout successfully")
  }
  return (
    <>
    <Toaster/>
      <div className="hidden  md:block  w-[5%]   justify-between items-center" >
       <div className=' flex flex-col justify-between items-center '>
       <div className='flex justify-center items-center m-9'>
          <HoverCard>
            <HoverCardTrigger>
              <MdChat style={{ fontSize: "25px" }} />

            </HoverCardTrigger>
            <HoverCardContent>
              Chat
            </HoverCardContent>
          </HoverCard>

        </div>
       <div className='mb-9 float-right'>
       <div className='flex flex-col justify-center items-center mt-9 '>
          <HoverCard>
            <HoverCardTrigger>
              <FiLogOut style={{ fontSize: "25px" }} onClick={handleLogout} />

            </HoverCardTrigger>
            <HoverCardContent>
              LogOut
            </HoverCardContent>
          </HoverCard>



        </div>
        <div className='flex flex-col justify-center items-center mt-9'>
          <HoverCard>
            <HoverCardTrigger>
           
   <div>
 
      <Profile/>

     </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Profile
            </HoverCardContent>
          </HoverCard>



        </div>
       </div>
       </div>
      </div>


    </>
  )
}
