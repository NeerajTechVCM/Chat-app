import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useConversation from '@/stateManagement/store'
import { useSocketContext } from '@/Context/SocketContext';



export default function User({user}) {
const {selectconversation,setSelectconversation} = useConversation();
const isSelected = selectconversation?._id===user._id;
const token = JSON.parse(localStorage.getItem("auth")).token;
const { onlineUsers, setOnlineUsers } = useSocketContext();
const isOnline = onlineUsers.includes(user._id)

// console.log(selectconversation)
 async function handleclick(){
setSelectconversation(user);

 }
  return (
    <>

      <div className={`flex mt-3 mb-6 items-center justify-between hover:bg-slate-400 rounded-md duration-300 p-2 ${isSelected?"bg-slate-400":""}`} onClick={handleclick}>
   <div className='flex space-x-5 items-center justify-start'>
   <div>
         <Avatar>
  <AvatarImage src={user.profile?user.profile:""} />
  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
</Avatar>

     </div>

     <div>
        <h5 className='text-red-600'>{user.username}</h5>

        <span className='text-blue-500'>{user.email}</span>
     </div>
   </div>
     
<div>
  <h3 className={`${isOnline?'text-blue-600':'text-red-600'}`}>{isOnline?"Online":"Offline"}</h3>
</div>
      </div>



    </>
  )
}
