import React from 'react';
import Logo from '../logo';
import { ThemeSwitcher } from '../theme-switcher';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-secondaryBlack text-text dark:text-text-dark">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Logo className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Sticky</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="text-sm sm:text-base hover:text-main transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm sm:text-base hover:text-main transition-colors">Privacy</Link>
            <ThemeSwitcher />
          </div>
        </div>
        <div className="mt-4 text-center text-xs sm:text-sm">
          &copy; {new Date().getUTCFullYear()} Sticky. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;