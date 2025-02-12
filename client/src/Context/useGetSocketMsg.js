import useConversation from '@/stateManagement/store'
import React, { useEffect, useState } from 'react'
import { useSocketContext } from './SocketContext';
import sound from '../assets/notification.mp3'

const useGetSocketMsg = () => {
  const {selectconversation,messages,setMessages} = useConversation();
  const {socket}=useSocketContext();
  console.log("select",selectconversation)
  useEffect(()=>{
      console.log(socket)
      if(socket){
      
        socket.on('newMsgs', (newMsg) => {
          console.log('New message received:', newMsg);
        const notification = new Audio(sound);
        notification.play();
      
          if(selectconversation._id===newMsg.senderId){
              setMessages([...messages, newMsg]);
          }
        
        });
        socket.on('newMsg', (newMsg) => {
          console.log('Message sent:', newMsg);
          // const notification = new Audio(sound);
          // notification.play();
          setMessages([...messages, newMsg]);
        });
          
          return ()=>socket.off('newMsgs')
      }
      
  },[socket,messages,setMessages])
}
 
    export default useGetSocketMsg;