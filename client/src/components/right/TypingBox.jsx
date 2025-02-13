import React, { useEffect, useState } from 'react';
import { LuSend } from 'react-icons/lu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/Context/AuthProvider';
import useConversation from '@/stateManagement/store';
import { useSocketContext } from '@/Context/SocketContext';
import { useTyping } from '@/Context/TypingContext';

export default function TypingBox() {
  const [data, setData] = useState('');
  const [auth] = useAuth();
  const { selectconversation } = useConversation();
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const { socket } = useSocketContext();
  const [typing, setTyping] = useState(false);
  const { isTyping, setIsTyping } = useTyping();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  // Adjust layout for mobile view
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
      const keyboardHeight = window.innerHeight * 0.3; // Approximate height of keyboard
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

  useEffect(() => {
    socket.on('typing', (sender) => {
      if (selectconversation._id === sender) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });

    socket.on('stop-typing', () => {
      setIsTyping(false);
    });

    return () => {
      socket.off('typing');
      socket.off('stop-typing');
    };
  }, [selectconversation, socket, setIsTyping]);

  function inputHandle(event) {
    setData(event.target.value);

    if (!socket) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectconversation, auth.id);
    }

    let lastTime = new Date().getTime();
    const timeLen = 4000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const diff = timeNow - lastTime;
      if (diff >= timeLen) {
        socket.emit('stop-typing', selectconversation);
        setTyping(false);
      }
    }, timeLen);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (selectconversation?._id) {
      const result = await fetch(`/send/${selectconversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
        credentials: 'include',
      });

      const res = await result.json();
      console.log('Message sent:', res);
    }

    setData('');
    socket.emit('stop-typing', selectconversation);
    setTyping(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center bg-green-100 space-x-2 justify-between border border-black"
          style={{ gap: '5px', paddingBottom: isMobileView ? `${keyboardHeight}px` : '0' }} // Adjust padding for mobile
        >
          <Input
            className="m-4"
            type="text"
            placeholder="Message....."
            onChange={inputHandle}
            value={data}
          />
          <span>
            <button type="submit">
              <LuSend
                className="cursor-pointer"
                style={{ fontSize: '25px', marginRight: '10px' }}
              />
            </button>
          </span>
        </div>
      </form>
    </>
  );
}
