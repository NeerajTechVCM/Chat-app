import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useConversation from '@/stateManagement/store';
import { FaRegHandPointLeft } from "react-icons/fa6";
import { useSocketContext } from '@/Context/SocketContext';
import { useTyping } from '@/Context/TypingContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

export default function HeaderR() {
  const { selectconversation, setSelectconversation } = useConversation();
  const { onlineUsers, userStatus } = useSocketContext(); // Assuming userStatus contains lastSeen info
  const { isTyping } = useTyping();

  
  const getOnlineStatus = (userId) => {
    onlineUsers.includes(userId) ? 'Online' : 'Offline'
  }

  
  const getOnlineDotStatus = (userId) => {
    return onlineUsers.includes(userId) ? 'bg-green-600' : 'bg-gray-600'
  }


  const getOnlineStatusColor = (userId) => {
    return onlineUsers.includes(userId) ? 'text-blue-600' : 'text-red-600'
  }

  const handleBack = () => {
    setSelectconversation(!selectconversation)
  }

  return (
    <>
      <div className="bg-gray-400 flex justify-between px-4 w-full items-center ">
        <div className="flex space-x-5 mt-3 mb-6 items-center justify-start">
          <div className='rounded-md text-blue-500 md:hidden'>
            <FaRegHandPointLeft style={{ fontSize: "25px" }} onClick={handleBack} />
          </div>
          <div>
            {/* The button to open modal */}
            <label htmlFor="my_modal_7" className="border-none outline-none">
              <Avatar className="relative">
                <AvatarImage src={selectconversation.profile ? selectconversation.profile : ""} />
                <AvatarFallback>{selectconversation ? selectconversation.username.charAt(0).toUpperCase() : ""}</AvatarFallback>
                <div className={`absolute top-0 right-0 w-4 h-4 rounded-full ${getOnlineDotStatus(selectconversation._id)} border-2 border-white`} />
              </Avatar>
            </label>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box ">
                <div className="flex flex-col justify-center text-xl items-center rounded-md mt-1 ">
                  <h1 className=' text-2xl'>Profile</h1>
                  <br />
                  <Avatar className='h-48 w-48'>
                    <AvatarImage src={selectconversation.profile ? selectconversation.profile : ""} />
                    <AvatarFallback>
                      {selectconversation ? selectconversation.username.charAt(0).toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <br />
                <h3 className="text-lg font-bold">Name: {selectconversation.username}</h3>
                <p className="py-4">{selectconversation.email}</p>
                <p className={getOnlineStatusColor(selectconversation._id)}>
                  {isTyping ? "Typing..." : getOnlineStatus(selectconversation._id)}
                </p>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
          </div>

          <div>
            <h5 className='text-red-600'>{selectconversation ? selectconversation.username : "Unknown"}</h5>
            <h3 className={getOnlineStatusColor(selectconversation._id)}>
              {isTyping ? "Typing..." : getOnlineStatus(selectconversation._id)}
            </h3>
          </div>
        </div>

        <span>
          <Popover>
            <PopoverTrigger><HiOutlineDotsVertical style={{ fontSize: '25px' }} /></PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col justify-between items-center space-y-5">
                <div className="flex justify-center items-center space-x-3">
                  <Label htmlFor="profile">
                    <label htmlFor="my_modal_7" className="border-none outline-none">
                      <Avatar>
                        <AvatarImage src={selectconversation.profile ? selectconversation.profile : ""} />
                        <AvatarFallback>{selectconversation ? selectconversation.username.charAt(0).toUpperCase() : ""}</AvatarFallback>
                      </Avatar>
                    </label>
                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                    <div className="modal" role="dialog">
                      <div className="modal-box ">
                        <div className="flex flex-col justify-center text-xl items-center rounded-md mt-1 ">
                          <h1 className='text-2xl'>Profile</h1>
                          <br />
                          <Avatar className='h-48 w-48'>
                            <AvatarImage src={selectconversation.profile ? selectconversation.profile : ""} />
                            <AvatarFallback>
                              {selectconversation ? selectconversation.username.charAt(0).toUpperCase() : ""}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <br />
                        <h3 className="text-lg font-bold">Name: {selectconversation.username}</h3>
                        <p className="py-4">{selectconversation.email}</p>
                        <p className={getOnlineStatusColor(selectconversation._id)}>
                          {isTyping ? "Typing..." : getOnlineStatus(selectconversation._id)}
                        </p>
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                    </div>
                  </Label>
                  <p>Profile</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </span>
      </div>
    </>
  );
}
