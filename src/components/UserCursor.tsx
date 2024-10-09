import React, { useEffect, useState } from 'react';
export const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777", "#2563EB", "#7C3AED", "#C026D3", "#059669", "#CA8A04"];

interface UserCursorProps {
  position: { x: number; y: number };
  color: string;
  name: string;
}


const UserCursor: React.FC<UserCursorProps> = ({ position, color, name }) => {
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    const animationDuration = 500;
    const startTime = Date.now();
    const startPosition = { ...currentPosition };

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / animationDuration, 1);
      
      setCurrentPosition({
        x: startPosition.x + (position.x - startPosition.x) * progress,
        y: startPosition.y + (position.y - startPosition.y) * progress,
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [position]);

  return (
    <div style={{
      position: 'absolute',
      left: currentPosition.x,
      top: currentPosition.y,
      pointerEvents: 'none',
      zIndex: 1000,
      transition: 'transform 0.1s linear',
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M13 26V9L25 21.1428H18.2189L13 26Z" fill={color} />
      </svg>
      <span style={{
        backgroundColor: color,
        color: 'white',
        padding: '2px 4px',
        borderRadius: '4px',
        fontSize: '12px',
        marginLeft: '4px',
      }}>
        {name}
      </span>
    </div>
  );
};

export default UserCursor;