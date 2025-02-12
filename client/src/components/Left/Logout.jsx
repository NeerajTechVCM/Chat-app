import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MdChat } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';


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
   <a  href="/profile" className='cursor-pointer'>   <Avatar>
  <AvatarImage src={ auth.image?auth.image:''} />
  <AvatarFallback>
  {auth.username ? auth.username.charAt(0).toUpperCase() : 'CN'}
</AvatarFallback>
</Avatar></a>
      

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
