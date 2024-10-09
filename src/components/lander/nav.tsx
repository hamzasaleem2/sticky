import { Link } from 'react-router-dom';
import Logo from "../logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4">
            <div className="z-50 mx-auto flex h-14 w-full max-w-[1024px] items-center justify-between rounded-base border border-border bg-white px-4 text-text dark:text-text-dark shadow-light dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText dark:shadow-dark">
                <Link to="/" className="flex items-center">
                    <Logo className="h-8 w-8 mr-2" />
                    <span className="text-lg font-heading sm:text-base">
                        Sticky
                    </span>
                </Link>

                <div className="hidden sm:flex items-center space-x-8 text-sm flex-grow justify-center">
                    <button className="hover:text-main transition-colors" onClick={() => scrollToSection('pricing')}>Pricing</button>
                    <button className="hover:text-main transition-colors" onClick={() => scrollToSection('faq')}>FAQ</button>
                </div>

                <div className="hidden sm:block">
                    <Link to="/signin">
                        <Button className="bg-white" onClick={()=>{}}>Sign In</Button>
                    </Link>
                </div>

                <button
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden relative top-full left-0 w-full mt-2 bg-white dark:bg-secondaryBlack border border-border dark:border-darkBorder rounded-base">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <button className="hover:text-main transition-colors" onClick={() => scrollToSection('pricing')}>Pricing</button>
                        <button className="hover:text-main transition-colors" onClick={() => scrollToSection('faq')}>FAQ</button>
                        <Link to="/signin">
                            <Button className="bg-white" onClick={()=>{}}>Sign In</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;