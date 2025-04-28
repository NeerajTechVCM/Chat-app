import React from 'react'
import Header from './Header'
import Search from './Search'
import Users from './Users'
import useConversation from '@/stateManagement/store';

import HeaderR from '../right/HeaderR';
import Messages from '../right/Messages';
import TypingBox from '../right/TypingBox';

export default function Left() {
   const {selectconversation,setSelectconversation} = useConversation();
  return (
   <>
   {
window.innerWidth<=768?(selectconversation?(
 <div className="bg-gray-300 px-1 h-screen w-full" >
     <HeaderR/>
        <Messages/>
        <TypingBox/>
 
 </div>

):(<div className=" bg-gray-300 px-7 h-screen w-[100%] md:w-[50%] lg:w-[40%]">
  <Header/>
  <Search/>
  <Users/>
 </div>)):(<div className=" bg-gray-300 px-7 h-screen w-[100%] md:w-[50%] lg:w-[40%]">
    <Header/>
    <Search/>
    <Users/>
   </div>)
}
   </>
  )
}
