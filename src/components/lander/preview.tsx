import React from 'react';
import { Button } from '../ui/button';
import { useHalloween } from '../../providers/halloween-provider';

const Preview: React.FC = () => {
    const { isHalloweenMode } = useHalloween();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="px-4 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
            <div className="relative w-full min-h-[60vh] overflow-hidden rounded-3xl">
                <div className={`absolute inset-0 ${isHalloweenMode
                        ? 'bg-halloween-black/90 animate-flicker'
                        : 'bg-white dark:bg-darkBg opacity-90'
                    }`}></div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between">
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0 pr-0 lg:pr-8">
                        <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 
                            ${isHalloweenMode ? 'text-halloween-orange' : 'text-text dark:text-text-dark'}`}>
                            {isHalloweenMode ? 'The haunted tape for your brain' : 'The duct tape for your brain'}
                            <img
                                src={"/duct-tape.png"}
                                alt="Tape for your brain"
                                className={`w-16 h-16 mr-4 ${isHalloweenMode ? 'animate-spooky-shake' : ''}`}
                            />
                        </h2>
                        <p className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-80
                            ${isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'}`}>
                            {isHalloweenMode ? 'Who needs a memory when you have ghostly notes?' : 'Who needs a photographic memory?'}
                        </p>
                        <Button
                            onClick={() => scrollToSection('pricing')}
                            className={`text-base sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3
                                ${isHalloweenMode ? 'bg-halloween-orange hover:bg-halloween-purple text-white' : ''}`}
                        >
                            {isHalloweenMode ? 'Summon Your Notes!' : 'Stick It to Chaos!'}
                        </Button>
                    </div>
                    <div className={`relative w-full aspect-square rounded-2xl shadow-2xl overflow-hidden group
                        ${isHalloweenMode ? 'bg-gradient-to-tr from-halloween-purple/20 to-halloween-orange/20' :
                            'bg-gradient-to-tr from-main/20 to-base-secondary/20'}`}>
                        <img
                            src="/board.png"
                            alt="Sticky app preview"
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 
                                ${isHalloweenMode ? 'filter hue-rotate-180 contrast-125' : 'filter grayscale group-hover:grayscale-0'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Preview;