import React, { useEffect, useState } from 'react';
import { LuSend } from 'react-icons/lu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/Context/AuthProvider';
import useConversation from '@/stateManagement/store';
import { useSocketContext } from '@/Context/SocketContext';
import Typing from '../typing/Typing';
import { useTyping } from '@/Context/TypingContext';

export default function TypingBox() {
  const [data, setData] = useState('');
  const [auth] = useAuth();
  const { selectconversation } = useConversation();
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const { socket } = useSocketContext();
  const [typing, setTyping] = useState(false);
  const { isTyping, setIsTyping } = useTyping();

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
  }, [selectconversation, socket]);

  function inputHandle(event) {
    setData(event.target.value);

    if (!socket) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectconversation, auth.id);
    }

    let lastTime = new Date().getTime();
    var timeLen = 2000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var diff = timeNow - lastTime;
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
    socket.emit('stop-typing', selectconversation); // Stop typing when the message is sent
    setTyping(false); // Reset typing state
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mt-4 bg-green-100 space-x-2 justify-between border border-black" style={{ gap: '5px' }}>
          <Input className="m-4" type="text" placeholder="Message....." onChange={inputHandle} value={data} />
          <span>
            <LuSend className="cursor-pointer" style={{ fontSize: '25px', marginRight: '10px' }} type="submit" />
          </span>
        </div>
      </form>
    </>
  );
}

