import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useConversation from '@/stateManagement/store';
import { FaRegHandPointLeft } from "react-icons/fa6";
import { useSocketContext } from '@/Context/SocketContext';
import { useTyping } from '@/Context/TypingContext';

export default function HeaderR() {
  const { selectconversation, setSelectconversation } = useConversation();
  const { onlineUsers, setOnlineUsers } = useSocketContext();
    const { isTyping } = useTyping(); 
  const getOnlineStatus= (userId)=>{
    return onlineUsers.includes(userId)?"Online":"Offline"
  }
  const getOnlineStatusColor= (userId)=>{
    return onlineUsers.includes(userId)?'text-blue-600':'text-red-600'
  }
  const handleBack = () => {
    setSelectconversation(!selectconversation)
  }
  return (
    <>
      <div className="bg-gray-400 w-full  flex justify-between px-4 items-center fixed top-0 ">
        <div className="flex space-x-5 mt-3 mb-6 items-center justify-start">
          <div className='rounded-md text-blue-500 md:hidden'>
            <FaRegHandPointLeft style={{ fontSize: "25px" }} onClick={handleBack} />
          </div>
          <div>
            <Avatar>
              <AvatarImage src={selectconversation.profile ? selectconversation.profile : ""} />
              <AvatarFallback>{selectconversation ? selectconversation.username.charAt(0).toUpperCase() : ""}</AvatarFallback>
            </Avatar>

          </div>

          <div>
            <h5 className='text-red-600'>   {selectconversation ? selectconversation.username : "Unknown"} </h5>

            <h3 className={
              getOnlineStatusColor(selectconversation._id)}>{
                
                isTyping?"Typing...":getOnlineStatus(selectconversation._id)}
              </h3>
          </div>


        </div>
        <span>
          <HiOutlineDotsVertical style={{ fontSize: '25px' }} />
        </span>

      </div>

    </>
  )
}
