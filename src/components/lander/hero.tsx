import React from 'react';
import { Button } from '../ui/button';
import { Check, Skull } from 'lucide-react';
import Preview from './preview';
import { useHalloween } from '../../providers/halloween-provider';

const HeroSection: React.FC = () => {
    const { isHalloweenMode } = useHalloween();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const features = isHalloweenMode 
        ? ['Haunt your ideas', 'Spooky organization', 'Ghostly collaboration']
        : ['Capture ideas', 'Organize effortlessly', 'Collaborate in real-time'];

    return (
        <>
            <section className={`flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden
                ${isHalloweenMode ? 'bg-gradient-to-b from-halloween-black to-halloween-purple/30' : ''}`}>
                <div className="text-center w-full max-w-5xl mx-auto">
                    <h1 className={`mb-6 sm:mb-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight
                        ${isHalloweenMode ? 'text-halloween-orange animate-spooky-shake' : 'text-text dark:text-text-dark'}`}>
                        {isHalloweenMode ? 'Spooky ideas that stick' : 'Ideas that stick'}
                        <span className="relative inline-block ml-2">
                            <span className={`text-base-secondary absolute -bottom-2 left-1/2 flex -translate-x-1/2 translate-y-full -rotate-3 
                                flex-nowrap items-center gap-1 whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl font-normal tracking-wide
                                ${isHalloweenMode ? 'text-halloween-orange' : ''}`}>
                                {isHalloweenMode ? 'if you dare 👻' : 'literally 😉'}
                            </span>
                        </span>
                    </h1>
                    <p className={`mb-8 sm:mb-10 text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed max-w-2xl mx-auto
                        ${isHalloweenMode ? 'text-halloween-ghost animate-float' : 'text-text dark:text-text-dark'}`}>
                        {isHalloweenMode ? 'Where your thoughts come alive... muhahaha!' : 'Connect your thoughts in one sticky playground.'}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-12 sm:mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center justify-center gap-2">
                                {isHalloweenMode ? (
                                    <Skull className="h-6 w-6 sm:h-7 sm:w-7 text-halloween-orange flex-shrink-0" strokeWidth={3} />
                                ) : (
                                    <Check className="h-6 w-6 sm:h-7 sm:w-7 text-main flex-shrink-0" strokeWidth={3} />
                                )}
                                <span className={`text-lg sm:text-xl font-medium ${isHalloweenMode ? 'text-halloween-ghost' : ''}`}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Button 
                            onClick={() => scrollToSection('pricing')} 
                            className={`text-xl sm:text-2xl px-8 sm:px-10 py-4 sm:py-5
                                ${isHalloweenMode ? 'bg-halloween-orange hover:bg-halloween-purple text-white' : ''}`}
                        >
                            {isHalloweenMode ? 'Enter if you dare!' : 'Try now!'}
                        </Button>
                    </div>
                </div>
            </section>
            <Preview />
        </>
    );
};

export default HeroSection;