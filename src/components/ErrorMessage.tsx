import React from 'react';
import Logo from './logo';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      <Logo className="h-16 w-16 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something went wrong</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{message}</p>
      <Button onClick={() => {
        navigate("/boards")
      }}>Go to Your Boards</Button>
    </div>
  );
};

export default ErrorMessage;