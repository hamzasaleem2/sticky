import React from 'react';
import { Server, Lock, Zap, Paintbrush, Skull } from 'lucide-react';
import { Button } from '../ui/button';
import { useHalloween } from '../../providers/halloween-provider';

const SelfHostSection: React.FC = () => {
  const { isHalloweenMode } = useHalloween();

  const features = isHalloweenMode ? [
    {
      icon: <Skull className="h-8 w-8 text-halloween-orange" />,
      title: "Dark Control",
      description: "Your haunted infrastructure, your cursed domain."
    },
    {
      icon: <Lock className="h-8 w-8 text-halloween-orange" />,
      title: "Spectral Privacy",
      description: "Keep your spirits close and secured."
    },
    {
      icon: <Zap className="h-8 w-8 text-halloween-orange" />,
      title: "Cursed Integrations",
      description: "Seamlessly blend with your dark rituals."
    },
    {
      icon: <Paintbrush className="h-8 w-8 text-halloween-orange" />,
      title: "Haunted Experience",
      description: "Customize to match your coven's essence."
    }
  ] : [
    {
      icon: <Server className="h-8 w-8 text-main" />,
      title: "Full Control",
      description: "Your infrastructure, your way."
    },
    {
      icon: <Lock className="h-8 w-8 text-main" />,
      title: "Enhanced Privacy",
      description: "Keep your data close and secure.",
    },
    {
      icon: <Zap className="h-8 w-8 text-main" />,
      title: "Custom Integrations",
      description: "Seamlessly fit into your workflow.",
    },
    {
      icon: <Paintbrush className="h-8 w-8 text-main" />,
      title: "Tailored Experience",
      description: "Customize to match your brand.",
    }
  ];

  return (
    <section className={`px-4 py-16 ${isHalloweenMode
      ? 'bg-gradient-to-b from-halloween-black to-halloween-purple/30'
      : 'bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900'
      }`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className={`text-4xl sm:text-5xl font-bold mb-8 ${isHalloweenMode ? 'text-halloween-orange' : 'text-text dark:text-text-dark'
          }`}>
          {isHalloweenMode ? 'Summon Your Own Instance' : 'Self-Host Sticky'}
        </h2>
        <p className={`text-xl mb-12 max-w-3xl mx-auto ${isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
          }`}>
          {isHalloweenMode
            ? 'Your dark magic, your ancient rules. Deploy Sticky in your own haunted realm.'
            : 'Your data, your rules. Deploy Sticky on your own terms.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isHalloweenMode={isHalloweenMode}
            />
          ))}
        </div>
        <Button
          onClick={() => window.open('https://github.com/hamzasaleem2/sticky', '_blank')}
          className={`inline-flex items-center text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isHalloweenMode
            ? 'bg-halloween-orange hover:bg-halloween-purple text-white'
            : ''
            }`}
        >
          {isHalloweenMode ? (
            <Skull className="mr-2 h-5 w-5" />
          ) : (
            <Server className="mr-2 h-5 w-5" />
          )}
          {isHalloweenMode ? 'Conjure Your Instance' : 'Explore Self-Hosting'}
        </Button>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isHalloweenMode: boolean;
}> = ({ icon, title, description, isHalloweenMode }) => (
  <div className={`${isHalloweenMode
    ? 'bg-halloween-black/50 border-halloween-orange/50 hover:border-halloween-orange spooky-hover'
    : 'bg-white dark:bg-secondaryBlack border-border dark:border-darkBorder'
    } border-2 rounded-base p-6 shadow-light dark:shadow-dark hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-none transition-all duration-300`}>
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className={`text-xl font-heading mb-2 ${isHalloweenMode ? 'text-halloween-ghost' : 'text-text dark:text-text-dark'
      }`}>{title}</h3>
    <p className={`${isHalloweenMode ? 'text-halloween-ghost/80' : 'text-text dark:text-text-dark'
      } font-base`}>{description}</p>
  </div>
);

export default SelfHostSection;