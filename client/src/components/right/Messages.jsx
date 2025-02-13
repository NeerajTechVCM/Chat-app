import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import useConversation from '@/stateManagement/store';
import useGetSocketMsg from '@/Context/useGetSocketMsg.js';
import { Loading } from './Loading';
import { useSocketContext } from '@/Context/SocketContext';
import Typing from '../typing/Typing';
import { useTyping } from '@/Context/TypingContext';
import background from '../../assets/cb.jpg';
import TypingBox from './TypingBox';

export default function Messages() {
  const { messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const { isTyping } = useTyping();
  const { selectconversation } = useConversation();
  const messageContainerRef = useRef(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Detect keyboard appearance on mobile
  useEffect(() => {
    const handleKeyboardShow = () => {
      const keyboardHeight = window.innerHeight * 0.3;
      setKeyboardHeight(keyboardHeight);
    };

    const handleKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    if (isMobileView) {
      window.addEventListener('resize', handleKeyboardShow);
      window.addEventListener('focusout', handleKeyboardHide);
    }

    return () => {
      window.removeEventListener('resize', handleKeyboardShow);
      window.removeEventListener('focusout', handleKeyboardHide);
    };
  }, [isMobileView]);

  useGetSocketMsg();

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
        }
      }

      fetchMsg();
    }
  }, [selectconversation, token, setMessages]);

  // Scroll to the bottom when typing indicator or messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [isTyping, messages]);

  return (
    <div
      className="h-[70%] overflow-y-scroll overflow-x-hidden p-4"
      style={{ backgroundImage: `url(${background})`, paddingBottom: `${keyboardHeight}px` }} // Adjust scroll on keyboard show
      ref={messageContainerRef}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex h-full justify-center items-center text-xl">{error}</div>
      ) : messages.length === 0 ? (
        <div className="flex h-full w-full justify-center items-center text-xl">
          Welcome to Chat App <br /> Say Hi!
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={msg._id}>
            <Message msg={msg} />
          </div>
        ))
      )}

      {isTyping && <Typing />}
    </div>
  );
}
