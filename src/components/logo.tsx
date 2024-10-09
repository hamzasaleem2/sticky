import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <LazyLoadImage
      src="/sticky-logo.png"
      alt="Sticky Logo"
      className={className}
      effect="blur"
    />
  );
};

export default Logo;