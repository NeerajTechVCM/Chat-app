import useConversation from '@/stateManagement/store';
import React from 'react'
import { useAuth } from '@/Context/AuthProvider'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function Message({msg}) {
  const {selectconversation,setSelectconversation} = useConversation();
  const authUser = JSON.parse(localStorage.getItem("auth"));
 const [auth,setAuth]=useAuth();
  const chatName=authUser.id===msg?.senderId?"chat-end":"chat-start";
  const chatColor=authUser.id===msg?.senderId?"bg-blue-600":"bg-black";
  const chatImg=authUser.id===msg?.senderId?(auth.image?auth.image:""):(selectconversation.profile?selectconversation.profile:"");
  const chatFallBackName=authUser.id===msg?.senderId?(auth.username?auth.username.charAt(0).toUpperCase():"CN"):(selectconversation.username?selectconversation.username.charAt(0).toUpperCase():"CN");
  const createdAt = new Date(msg.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
  })
  return (
    <>

<div className={`chat ${chatName}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <Avatar>
              <AvatarImage src={chatImg} />
              <AvatarFallback>
              {chatFallBackName}
            </AvatarFallback>
           </Avatar>
    </div>
  </div>
 
  <div className={`chat-bubble ${chatColor}`} style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}>{(selectconversation?._id && msg)? msg.messages:""}</div>
  <div className="chat-footer">{formattedTime}</div>

 
</div>
    </>
  )
}
