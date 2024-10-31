import React from 'react';
import { Button } from '../ui/button';
import { Check, Skull, Ghost } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHalloween } from '../../providers/halloween-provider';

const PricingSection: React.FC = () => {
    const navigate = useNavigate();
    const { isHalloweenMode } = useHalloween();

    const handleSignUp = (plan: 'free' | 'pro') => {
        navigate(`/signup?plan=${plan}`);
    };

    return (
        <section id="pricing" className={`px-4 py-16 overflow-hidden mt-4 ${
            isHalloweenMode ? 'bg-halloween-black/50' : 'bg-transparent dark:bg-darkBg'
        }`}>
            <div className="max-w-6xl mx-auto">
                <div className={`text-center mb-12 p-6 rounded-lg border-2 ${
                    isHalloweenMode 
                        ? 'bg-halloween-purple/20 border-halloween-orange animate-flicker' 
                        : 'bg-main/10 border-main'
                }`}>
                    <h2 className={`text-3xl font-bold mb-4 ${
                        isHalloweenMode ? 'text-halloween-orange' : 'text-main'
                    }`}>
                        {isHalloweenMode ? '👻 Haunted Beta Access' : '🎉 Exclusive Beta Access'}
                    </h2>
                    <p className={`text-xl mb-4 ${
                        isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                    }`}>
                        {isHalloweenMode 
                            ? 'Join our coven and get early access to all supernatural features!' 
                            : 'Get early access to all features for free during our beta period!'}
                    </p>
                    <p className={`text-lg font-semibold ${
                        isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                    }`}>
                        {isHalloweenMode ? 'No soul required to sign up' : 'No credit card required to sign up'}
                    </p>
                </div>

                <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 ${
                    isHalloweenMode ? 'text-halloween-orange' : 'text-text dark:text-text-dark'
                }`}>
                    {isHalloweenMode ? 'Choose Your Curse' : 'Future Pricing Plans'}
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    {/* Free Plan */}
                    <div className="w-full max-w-[350px] transform -rotate-3 transition-transform hover:scale-105">
                        <div className={`rounded-base p-6 sm:p-8 shadow-xl flex flex-col h-full ${
                            isHalloweenMode 
                                ? 'bg-halloween-black border-2 border-halloween-orange/50 hover:border-halloween-orange' 
                                : 'bg-white dark:bg-secondaryBlack border-2 border-border dark:border-darkBorder'
                        }`}>
                            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${
                                isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                            }`}>
                                {isHalloweenMode ? 'Spectral Starter' : 'Sticky Starter'}
                            </h3>
                            <p className={`text-3xl sm:text-4xl font-bold mb-6 ${
                                isHalloweenMode ? 'text-halloween-orange' : 'text-main'
                            }`}>
                                $0<span className={`text-base sm:text-lg font-normal ${
                                    isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                                }`}>/month</span>
                            </p>
                            <ul className="mb-6 sm:mb-8 flex-grow">
                                {[
                                    isHalloweenMode 
                                        ? ['1 Haunted Board', 'Unlimited ghostly notes', 'Spirit sync', 'Ouija support']
                                        : ['1 Board', 'Unlimited sticky notes', 'Cloud sync', 'Email support']
                                ][0].map((feature, index) => (
                                    <li key={index} className={`flex items-center mb-3 text-sm sm:text-base ${
                                        isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                                    }`}>
                                        <div className={`rounded-full p-1 mr-2 ${
                                            isHalloweenMode ? 'bg-halloween-orange' : 'bg-main'
                                        }`}>
                                            {isHalloweenMode ? <Ghost className="h-3 w-3 sm:h-4 sm:w-4 text-white" /> : 
                                                              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-text" />}
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button 
                                onClick={() => handleSignUp('free')} 
                                className={`w-full justify-center text-base sm:text-lg ${
                                    isHalloweenMode ? 'bg-halloween-orange hover:bg-halloween-purple text-white' : ''
                                }`}
                            >
                                {isHalloweenMode ? 'Join the Haunting' : 'Sign Up for Free'}
                            </Button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="w-full max-w-[350px] transform rotate-3 transition-transform hover:scale-105">
                        <div className={`rounded-base p-6 sm:p-8 shadow-xl flex flex-col h-full relative overflow-hidden ${
                            isHalloweenMode 
                                ? 'bg-halloween-black border-2 border-halloween-orange' 
                                : 'bg-white dark:bg-secondaryBlack border-2 border-main'
                        }`}>
                            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${
                                isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                            }`}>
                                {isHalloweenMode ? 'Phantom Pro' : 'Sticky Pro'}
                            </h3>
                            <p className={`text-3xl sm:text-4xl font-bold mb-6 ${
                                isHalloweenMode ? 'text-halloween-orange' : 'text-main'
                            }`}>
                                $2<span className={`text-base sm:text-lg font-normal ${
                                    isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                                }`}>/month</span>
                            </p>
                            <ul className="mb-6 sm:mb-8 flex-grow">
                                {[
                                    isHalloweenMode 
                                        ? ['Unlimited Haunted Boards', 'Unlimited ghostly notes', 'Spectral collaboration', 'Priority séance support', 'Early access to dark magic']
                                        : ['Unlimited Boards', 'Unlimited sticky notes', 'Real-time collaboration', 'Priority support', 'Early access to new features']
                                ][0].map((feature, index) => (
                                    <li key={index} className={`flex items-center mb-3 text-sm sm:text-base ${
                                        isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
                                    }`}>
                                        <div className={`rounded-full p-1 mr-2 ${
                                            isHalloweenMode ? 'bg-halloween-orange' : 'bg-main'
                                        }`}>
                                            {isHalloweenMode ? <Skull className="h-3 w-3 sm:h-4 sm:w-4 text-white" /> : 
                                                              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-text" />}
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => handleSignUp('pro')}
                                className={`w-full justify-center text-base sm:text-lg ${
                                    isHalloweenMode 
                                        ? 'bg-halloween-orange hover:bg-halloween-purple text-white' 
                                        : 'bg-main hover:bg-mainAccent transition-colors'
                                }`}
                            >
                                {isHalloweenMode ? 'Unleash Full Power' : 'Sign Up for Pro (Beta)'}
                            </Button>
                            <div className={`absolute -right-12 top-6 px-12 py-1 transform rotate-45 text-sm font-semibold ${
                                isHalloweenMode 
                                    ? 'bg-halloween-orange text-white' 
                                    : 'bg-main text-text'
                            }`}>
                                {isHalloweenMode ? 'Cursed Access' : 'Beta Access'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;