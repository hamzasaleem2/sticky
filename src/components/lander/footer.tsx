import React from 'react';
import Logo from '../logo';
import { ThemeSwitcher } from '../theme-switcher';
import { Link } from 'react-router-dom';
import { HalloweenSwitcher } from '../halloween-switcher';
import { useHalloween } from '../../providers/halloween-provider';

const Footer: React.FC = () => {
  const { isHalloweenMode } = useHalloween();

  return (
    <footer className={`${
      isHalloweenMode 
        ? 'bg-halloween-black/90 text-halloween-ghost' 
        : 'bg-white dark:bg-secondaryBlack text-text dark:text-text-dark'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Logo className={`h-8 w-8 mr-2 ${isHalloweenMode ? 'animate-spooky-shake' : ''}`} />
            <span className={`text-xl font-bold ${
              isHalloweenMode ? 'text-halloween-orange' : ''
            }`}>Sticky</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/terms" className={`text-sm sm:text-base transition-colors ${
              isHalloweenMode ? 'hover:text-halloween-orange' : 'hover:text-main'
            }`}>Terms</Link>
            <Link to="/privacy" className={`text-sm sm:text-base transition-colors ${
              isHalloweenMode ? 'hover:text-halloween-orange' : 'hover:text-main'
            }`}>Privacy</Link>
            <ThemeSwitcher />
            <HalloweenSwitcher />
          </div>
        </div>
        <div className={`mt-4 text-center text-xs sm:text-sm ${
          isHalloweenMode ? 'text-halloween-ghost/80' : ''
        }`}>
          &copy; {new Date().getUTCFullYear()} Sticky. {isHalloweenMode ? 'All souls reserved.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;