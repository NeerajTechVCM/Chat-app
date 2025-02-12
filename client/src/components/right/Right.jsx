import React, { useState, useEffect } from 'react';

import TypingBox from './TypingBox';
import Messages from './Messages';
import useConversation from '@/stateManagement/store';
import HeaderR from './HeaderR';

export default function Right() {
  const { selectconversation, setSelectconversation } = useConversation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Function to handle resize event to detect keyboard visibility
    const handleResize = () => {
      const isKeyboardVisible = window.innerHeight < document.documentElement.clientHeight;
      setKeyboardVisible(isKeyboardVisible);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="bg-gray-300 px-1 h-screen md:w-[70%] lg:w-[70%] hidden md:block">
        {/* Adjust the bottom margin based on the keyboard visibility */}
        <div style={{ marginBottom: keyboardVisible ? '100px' : '0' }}>
          {selectconversation ? (
            <>
              <HeaderR />
              <Messages />
              <TypingBox />
            </>
          ) : (
            <div className="flex h-full w-full text-xl justify-center items-center bg-slate-100">
              Welcome to the Chat App <br /> Please Select a friend for Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
}
