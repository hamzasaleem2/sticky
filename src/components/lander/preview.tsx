import React from 'react';
import { Button } from '../ui/button';

const Preview: React.FC = () => {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="px-4 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
    <div className="relative w-full min-h-[60vh] overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-white dark:bg-darkBg opacity-90"></div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between">
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0 pr-0 lg:pr-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-text dark:text-text-dark">
                            The duct tape for your brain         
                            <img
                                src="/duct-tape.png"
                                alt="Duct tape for your brain"
                                className="w-16 h-16 mr-4"
                            />
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-text dark:text-text-dark opacity-80">
                            Who needs a photographic memory?
                        </p>
                        <Button onClick={() => scrollToSection('pricing')} className="text-base sm:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
                            Stick It to Chaos!
                        </Button>
                    </div>
                    <div className="relative w-full aspect-square bg-gradient-to-tr from-main/20 to-base-secondary/20 rounded-2xl shadow-2xl overflow-hidden group">
                        <img
                            src="/board.png"
                            alt="Sticky app preview"
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Preview;