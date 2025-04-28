import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useConversation from '@/stateManagement/store'
import { useSocketContext } from '@/Context/SocketContext';
import { useTyping } from '@/Context/TypingContext';




export default function User({ user }) {
  const { selectconversation, setSelectconversation } = useConversation();
  const isSelected = selectconversation?._id === user._id;
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const { onlineUsers, setOnlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id)
  const { isTyping } = useTyping();

  // console.log(selectconversation)
  async function handleclick() {
    setSelectconversation(user);

  }
  return (
    <>

      <div className={`flex mt-3 mb-6 items-center justify-between hover:bg-slate-400 rounded-md duration-300 p-2 ${isSelected ? "bg-slate-400" : ""}`} onClick={handleclick}>
        <div className='flex space-x-5 items-center justify-start'>
          <div>
            

            

            <Avatar className="relative">
            <AvatarImage src={user.profile ? user.profile : ""} />
  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>

  {/* Online status indicator */}
  <div className={`absolute top-0 right-0 w-4 h-4 rounded-full ${isOnline ? 'bg-green-600' : 'bg-gray-600'} border-2 border-white`}/>
</Avatar>

            
              

          </div>

          <div className='flex w-full flex-col '>
            <div className='flex justify-between items-center'>
              <div>
                <h5 className='text-red-600'>{user.username}</h5>


              </div>
            
            </div>
            <div>
              <span className='text-blue-500'>{user.email}</span>
            </div>
          </div>
        </div>



      </div>



    </>
  )
}
