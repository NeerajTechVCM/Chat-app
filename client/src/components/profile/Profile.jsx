import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { useAuth } from '@/Context/AuthProvider'
import { Button } from '../ui/button';

export default function Profile() {

 const [auth,setAuth]=useAuth();

  return (
    <>
     <div className="flex flex-col h-screen w-full bg-gray-300">
     <div className="flex  p-5 text-xl justify-between items-center rounded-md mt-1 ">
     <h1 className='text-2xl font-bold'>My Profile</h1>
     <a href="/editProfile"><Button > Edit Profile</Button></a>

     </div>
     <div className="flex flex-col space-y-3 justify-center p-5 text-xl items-center rounded-md mt-1 ">
          <Avatar className='h-48 w-48  md:h-72 md:w-72'>
         <AvatarImage src={ auth.image?auth.image:''} />
         <AvatarFallback>
         {auth.username ? auth.username.charAt(0).toUpperCase() : 'CN'}
       </AvatarFallback>
      </Avatar>

      
      
     </div>
     <div className="flex  p-5 text-xl text-red-600 items-center rounded-md mt-1 ">{auth.username?auth.username:"Unknown"}</div>
     <div className="flex  p-5 text-xl  text-red-600 items-center rounded-md mt-1 ">{auth.email?auth.email:"Unknown@gmail.com"}</div>
    

        </div> 
    </>
  )
}
