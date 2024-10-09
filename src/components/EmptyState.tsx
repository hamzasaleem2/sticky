import React from 'react';
import { Button } from './ui/button';

interface EmptyStateProps {
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, buttonText, onButtonClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src="/sticky-sad.png" alt="Sad Sticky" className="w-32 h-32 mb-4" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{message}</p>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      )}
    </div>
  );
};

export default EmptyState;