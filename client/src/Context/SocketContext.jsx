
import React, { createContext, useContext, useEffect, useState } from 'react'
import  io  from 'socket.io-client';
import { useAuth } from './AuthProvider';
import useConversation from '@/stateManagement/store';

 const SocketContext=createContext();

export default function SocketProvider({children}) {
  const [socket,setSocket]=useState(null);
  const [auth] = useAuth();
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [userStatus,setUserStatus] = useState({});

  const {selectconversation} = useConversation();

    // console.log(auth.id)
    // const [searchResults,setSearchResults]=useState([]);
  
    
    useEffect(()=>{
      if(auth){
        
        const socket=io("https://chat-app-1-q0ke.onrender.com",{
          query:{
            userId:auth.id,
          }
        })
        setSocket(socket);
        socket.on("getOnline",(users)=>{
setOnlineUsers(users)


        })


    //     
        return ()=>socket.close();

      }else{
        if(socket){
 
          socket.close();
          setSocket(null)
  
        }
      }
    

    },[auth]);
  return (
   <SocketContext.Provider value={{socket,onlineUsers,setOnlineUsers ,userStatus,setUserStatus}}>
    {children}
   </SocketContext.Provider>
  )
}

export const useSocketContext=()=>useContext(SocketContext);