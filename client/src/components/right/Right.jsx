import React from 'react'

import TypingBox from './TypingBox'
import Messages from './Messages'
import useConversation from '@/stateManagement/store';

import HeaderR from './HeaderR';

export default function Right() {
  const {selectconversation,setSelectconversation} = useConversation();
  return (
    <>
      <div className="bg-gray-300 px-1 h-screen md:w-[70%] lg:w-[70%] hidden md:block" >
     { selectconversation? 
     <>
      <HeaderR/>
        <Messages/>
      <TypingBox/>
        </>
        :<div className='flex h-full w-full  text-xl justify-center items-center bg-slate-100'    >Welcome to the Chat App <br/>Please Select the friend for Chat </div>}
      </div>
    </>
  )
}
