import { Link } from 'react-router-dom';
import Logo from "../logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useHalloween } from '../../providers/halloween-provider';
import { HalloweenSwitcher } from '../halloween-switcher';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isHalloweenMode } = useHalloween();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4">
            <div className={`z-50 mx-auto flex h-14 w-full max-w-[1024px] items-center justify-between rounded-base border px-4 shadow-light
                ${isHalloweenMode
                    ? 'border-halloween-orange/50 bg-halloween-black/90 text-halloween-ghost'
                    : 'border-border bg-white text-text dark:border-darkBorder dark:bg-secondaryBlack dark:text-text-dark dark:shadow-dark'}`}>
                <Link to="/" className="flex items-center">
                    <Logo className={`h-8 w-8 mr-2 ${isHalloweenMode ? 'animate-spooky-shake' : ''}`} />
                    <span className={`text-lg font-heading sm:text-base ${isHalloweenMode ? 'text-halloween-orange' : ''
                        }`}>
                        Sticky
                    </span>
                </Link>

                <div className="hidden sm:flex items-center space-x-8 text-sm flex-grow justify-center">
                    <button
                        className={`transition-colors ${isHalloweenMode ? 'hover:text-halloween-orange' : 'hover:text-main'
                            }`}
                        onClick={() => scrollToSection('pricing')}
                    >
                        {isHalloweenMode ? 'Cursed Plans' : 'Pricing'}
                    </button>
                    <button
                        className={`transition-colors ${isHalloweenMode ? 'hover:text-halloween-orange' : 'hover:text-main'
                            }`}
                        onClick={() => scrollToSection('faq')}
                    >
                        {isHalloweenMode ? 'Dark Secrets' : 'FAQ'}
                    </button>
                </div>

                <div className="hidden sm:flex items-center space-x-4">
                    <HalloweenSwitcher />
                    <Link to="/signin">
                        <Button className={isHalloweenMode
                            ? 'bg-halloween-orange hover:bg-halloween-purple text-white'
                            : 'bg-white'
                        } onClick={() => { }}>
                            {isHalloweenMode ? 'Enter Portal' : 'Sign In'}
                        </Button>
                    </Link>
                </div>

                <button
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen
                        ? <X className={`h-6 w-6 ${isHalloweenMode ? 'text-halloween-orange' : ''}`} />
                        : <Menu className={`h-6 w-6 ${isHalloweenMode ? 'text-halloween-orange' : ''}`} />
                    }
                </button>
            </div>

            {isMenuOpen && (
                <div className={`sm:hidden relative top-full left-0 w-full mt-2 rounded-base border ${isHalloweenMode
                        ? 'bg-halloween-black/90 border-halloween-orange/50 text-halloween-ghost'
                        : 'bg-white dark:bg-secondaryBlack border-border dark:border-darkBorder'
                    }`}>
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <button
                            className={`transition-colors ${isHalloweenMode ? 'hover:text-halloween-orange' : 'hover:text-main'
                                }`}
                            onClick={() => scrollToSection('pricing')}
                        >
                            {isHalloweenMode ? 'Cursed Plans' : 'Pricing'}
                        </button>
                        <button
                            className={`transition-colors ${isHalloweenMode ? 'hover:text-halloween-orange' : 'hover:text-main'
                                }`}
                            onClick={() => scrollToSection('faq')}
                        >
                            {isHalloweenMode ? 'Dark Secrets' : 'FAQ'}
                        </button>
                        <div className="flex items-center space-x-4">
                            <HalloweenSwitcher />
                            <Link to="/signin">
                                <Button className={isHalloweenMode
                                    ? 'bg-halloween-orange hover:bg-halloween-purple text-white'
                                    : 'bg-white'
                                } onClick={() => { }}>
                                    {isHalloweenMode ? 'Enter Portal' : 'Sign In'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;