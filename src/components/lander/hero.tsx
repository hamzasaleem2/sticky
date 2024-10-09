import React from 'react';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import Preview from './preview';

const HeroSection: React.FC = () => {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
                <div className="text-center w-full max-w-5xl mx-auto">
                    <h1 className="mb-6 sm:mb-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-text dark:text-text-dark">
                        Ideas that stick
                        <span className="relative inline-block ml-2">
                            <span className="text-base-secondary absolute -bottom-2 left-1/2 flex -translate-x-1/2 translate-y-full -rotate-3 flex-nowrap items-center gap-1 whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl font-normal tracking-wide">
                                literally <span className="opacity-100">😉</span>
                            </span>
                        </span>
                    </h1>
                    <p className="mb-8 sm:mb-10 text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-text dark:text-text-dark max-w-2xl mx-auto">
                        Connect your thoughts in one sticky playground.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-12 sm:mb-16">
                        {['Capture ideas', 'Organize effortlessly', 'Collaborate in real-time'].map((feature, index) => (
                            <div key={index} className="flex items-center justify-center gap-2">
                                <Check className="h-6 w-6 sm:h-7 sm:w-7 text-main flex-shrink-0" strokeWidth={3} />
                                <span className="text-lg sm:text-xl font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Button onClick={() => scrollToSection('pricing')} className="text-xl sm:text-2xl px-8 sm:px-10 py-4 sm:py-5">
                            Try now!
                        </Button>
                        <a href="https://www.producthunt.com/posts/sticky-6e1e2b83-364b-402a-b191-5dab338d76e4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sticky&#0045;6e1e2b83&#0045;364b&#0045;402a&#0045;b191&#0045;5dab338d76e4" target="_blank">
                            <img 
                                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=495757&theme=light" 
                                alt="Sticky - Ideas&#0032;that&#0032;Stick&#0044;&#0032;literally | Product Hunt" 
                                style={{ width: '250px', height: '54px' }} 
                                width="250" 
                                height="54" 
                            />
                        </a>
                    </div>
                </div>
            </section>
            <Preview />
        </>
    );
};

export default HeroSection;