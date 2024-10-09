import React, { useState } from 'react';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
};

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
  tooltip,
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group">
      <button
        className={`
          w-12 h-12 relative
          flex items-center justify-center
          rounded-full
          ${isActive
            ? 'bg-main text-text'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          }
          ${disabled
            ? 'opacity-50 cursor-default'
            : 'hover:bg-main hover:text-text transition-all duration-200'
          }
          focus:outline-none
          shadow-md hover:shadow-lg transform hover:-translate-y-1
          border-2 border-transparent hover:border-text
          ${isActive ? 'cursor-pointer' : ''}
        `}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="relative z-10">
          {children}
        </div>
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-text text-white text-xs rounded whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
}