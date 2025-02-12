// src/TypingAnimation.js
import React from 'react';

const Typing = () => {
  const dotStyle = {
    width: '8px',
    height: '8px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '0 3px',
    opacity: 0.7,
    animation: 'animDots 1.8s ease-in-out infinite'
  };

  return (
<>
<div className="chat chat-start ms-9">

<div className="chat-bubble bg-red-300 inline-flex justify-center items-center ">
 
         <div style={{ ...dotStyle, animationDelay: '0s' }}></div>

      <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
      <div style={{ ...dotStyle, animationDelay: '0.4s' }}></div>

      <style>
        {`
          @keyframes animDots {
            0%, 44% {
              transform: translateY(0);
              opacity: 0.7;
            }
            28% {
              transform: translateY(-10px);
              opacity: 0.4;
            }
            44% {
              opacity: 0.2;
            }
          }
        `}
      </style>
    </div>
 
</div>

    
   
  </>
  );
};

export default Typing;