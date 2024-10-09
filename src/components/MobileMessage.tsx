import React from 'react';
import Logo from './logo';

const MobileBoardMessage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100 p-4 text-center">
      <Logo className="h-16 w-16 mb-6 animate-bounce" />
      <h1 className="text-3xl font-bold mb-4 text-purple-600">Oops! Our sticky notes are shy on small screens</h1>
      <p className="text-xl mb-6 text-gray-700">
        We're working on making our board as flexible as your ideas! For now, please use a larger screen to access the full Sticky experience.
      </p>
      <div className="text-lg text-purple-500 font-semibold">
        <p>Don't worry, your ideas are safe and sound!</p>
        <p className="mt-2">We can't wait to see you on a bigger screen soon! 🚀</p>
      </div>
    </div>
  );
};

export default MobileBoardMessage;