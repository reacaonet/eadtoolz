import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${hover ? 'transition-transform hover:scale-105 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
