import React, { useState, useEffect } from 'react';

const CursorFollower = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <img
      src={"/3D-ROBOT.png"}
      alt="Chatbot Robot"
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CursorFollower;