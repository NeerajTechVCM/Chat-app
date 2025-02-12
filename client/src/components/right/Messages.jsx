import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import useConversation from '@/stateManagement/store';
import useGetSocketMsg from '@/Context/useGetSocketMsg.js';
import { Loading } from './Loading';
import { useSocketContext } from '@/Context/SocketContext';

import Typing from '../typing/Typing';
import { useTyping } from '@/Context/TypingContext';
import background from '../../assets/cb.jpg';

export default function Messages() {
  const { messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const { isTyping } = useTyping(); // Track typing state

  if (!token) {
    return <div className="flex h-full justify-center items-center text-xl">No token found. Please log in.</div>;
  }

  const { selectconversation } = useConversation();
  const messageContainerRef = useRef(null); // Create ref for the message container

  useGetSocketMsg();

  // Fetch messages on conversation change
  useEffect(() => {
    if (selectconversation?._id) {
      setLoading(true);
      async function fetchMsg() {
        try {
          const result = await fetch(`/get/${selectconversation._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });

          const data = await result.json();
          if (data.success) {
            setMessages(data.msgs);
            setLoading(false);
          } else {
            setError(data.msg);
            setLoading(false);
          }
        } catch (error) {
          setError('An error occurred while fetching messages.');
          setLoading(false);
          console.error(error);
        }
      }

      fetchMsg();
    }
  }, [selectconversation, token, setMessages]);

  const lastMsgRef = useRef();
  // Scroll to the last message when messages update
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  // Scroll to the bottom when typing indicator is visible
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [isTyping, messages]); // Scroll when typing or new message is received

  return (
    <>
      <div
        className="h-[73%] overflow-y-scroll overflow-x-hidden p-4"
        style={{ backgroundImage: `url(${background})` }}
        ref={messageContainerRef} // Attach the ref to the message container
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <div className='flex h-full justify-center items-center text-xl'>{error}</div>
        ) : messages.length === 0 ? (
          <div className='flex h-full w-full justify-center items-center text-xl'>
            Welcome to Chat App <br /> Say Hi!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id}
              ref={index === messages.length - 1 ? lastMsgRef : null}
            >
              <Message msg={msg} />
            </div>
          ))
        )}
        {isTyping && <Typing />} {/* Show typing animation when isTyping is true */}
      </div>

   
    </>
  );
}
