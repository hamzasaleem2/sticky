import React from 'react';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingSection: React.FC = () => {
    const navigate = useNavigate();

    const handleSignUp = (plan: 'free' | 'pro') => {
        navigate(`/signup?plan=${plan}`);
    };
    return (
        <section id="pricing" className="px-4 py-16 bg-transparent dark:bg-darkBg overflow-hidden mt-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 p-6 bg-main/10 rounded-lg border-2 border-main">
                    <h2 className="text-3xl font-bold text-main mb-4">🎉 Exclusive Beta Access</h2>
                    <p className="text-xl text-text dark:text-text-dark mb-4">
                        Get early access to all features for free during our beta period!
                    </p>
                    <p className="text-lg text-text dark:text-text-dark font-semibold">
                        No credit card required to sign up
                    </p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-text dark:text-text-dark">
                    Future Pricing Plans
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    {/* Free Plan */}
                    <div className="w-full max-w-[350px] transform -rotate-3 transition-transform hover:scale-105">
                        <div className="bg-white dark:bg-secondaryBlack border-2 border-border dark:border-darkBorder rounded-base p-6 sm:p-8 shadow-light dark:shadow-dark flex flex-col h-full">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-text dark:text-text-dark">Sticky Starter</h3>
                            <p className="text-3xl sm:text-4xl font-bold mb-6 text-main">$0<span className="text-base sm:text-lg font-normal text-text dark:text-text-dark">/month</span></p>
                            <ul className="mb-6 sm:mb-8 flex-grow">
                                {[ '1 Board', 'Unlimited sticky notes', 'Cloud sync', 'Email support'].map((feature, index) => (
                                    <li key={index} className="flex items-center mb-3 text-sm sm:text-base text-text dark:text-text-dark">
                                        <div className="bg-main rounded-full p-1 mr-2">
                                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-text" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button onClick={() => handleSignUp('free')} className="w-full justify-center text-base sm:text-lg">
                                Sign Up for Free
                            </Button>
                        </div>
                    </div>
                    {/* Pro Plan */}
                    <div className="w-full max-w-[350px] transform rotate-3 transition-transform hover:scale-105">
                        <div className="bg-white dark:bg-secondaryBlack border-2 border-main rounded-base p-6 sm:p-8 shadow-light dark:shadow-dark flex flex-col h-full relative overflow-hidden">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-text dark:text-text-dark">Sticky Pro</h3>
                            <p className="text-3xl sm:text-4xl font-bold mb-6 text-main">$2<span className="text-base sm:text-lg font-normal text-text dark:text-text-dark">/month</span></p>
                            <ul className="mb-6 sm:mb-8 flex-grow">
                                {['Unlimited Boards', 'Unlimited sticky notes', 'Real-time collaboration', 'Priority support', 'Early access to new features'].map((feature, index) => (
                                    <li key={index} className="flex items-center mb-3 text-sm sm:text-base text-text dark:text-text-dark">
                                        <div className="bg-main rounded-full p-1 mr-2">
                                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-text" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                            onClick={() => handleSignUp('pro')}
                            className="w-full justify-center text-base sm:text-lg bg-main hover:bg-mainAccent transition-colors"
                        >
                            Sign Up for Pro (Beta)
                        </Button>
                            <div className="absolute -right-12 top-6 bg-main text-text px-12 py-1 transform rotate-45 text-sm font-semibold">
                                Beta Access
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default PricingSection;