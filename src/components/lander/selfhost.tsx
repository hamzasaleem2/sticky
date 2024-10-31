import React from 'react';
import { Skull, GitFork, Lock, Server } from 'lucide-react';
import { Button } from '../ui/button';
import { useHalloween } from '../../providers/halloween-provider';

const SelfHostSection: React.FC = () => {
  const { isHalloweenMode } = useHalloween();

  return (
    <section className={`px-4 py-2 ${isHalloweenMode
      ? 'bg-gradient-to-b from-halloween-black/50 to-halloween-purple/20'
      : 'bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-gray-900/50 dark:to-purple-900/50'
      }`}>
      <div className="max-w-3xl mx-auto">
        <div className={`flex items-center justify-between p-2 border rounded-lg ${isHalloweenMode
          ? 'bg-halloween-black/50 border-halloween-orange/50'
          : 'bg-white dark:bg-secondaryBlack border-border dark:border-darkBorder'
          }`}>
          <div className="flex items-center gap-4">
            <div className={`p-1.5 rounded-md ${isHalloweenMode
              ? 'bg-halloween-orange/10'
              : 'bg-purple-50 dark:bg-gray-800'
              }`}>
              {isHalloweenMode
                ? <Skull className="h-4 w-4 text-halloween-orange" />
                : <GitFork className="h-4 w-4 text-main" />
              }
            </div>
            <div className="flex flex-col items-start">
              <h3 className={`text-sm font-medium ${isHalloweenMode
                ? 'text-halloween-orange'
                : 'text-text dark:text-text-dark'
                }`}>
                {isHalloweenMode ? 'Summon Your Instance' : 'Self-Host Sticky'}
              </h3>
              <p className={`text-xs ${isHalloweenMode
                ? 'text-halloween-ghost'
                : 'text-gray-500 dark:text-gray-400'
                }`}>
                {isHalloweenMode
                  ? 'Deploy in your haunted realm'
                  : 'Deploy on your infrastructure'}
              </p>
              <div className="flex gap-3 mt-1">
                <span className={`flex items-center gap-1 text-xs ${isHalloweenMode
                    ? 'text-halloween-ghost/80'
                    : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  <Lock className="h-3 w-3" />
                  {isHalloweenMode ? 'Dark Security' : 'Full Control'}
                </span>
                <span className={`flex items-center gap-1 text-xs ${isHalloweenMode
                  ? 'text-halloween-ghost/80'
                  : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  <Server className="h-3 w-3" />
                  {isHalloweenMode ? 'Cursed Stack' : 'React + Convex.dev'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              onClick={() => window.open('https://github.com/hamzasaleem2/sticky', '_blank')}
              className={`text-xs px-3 py-1 ${isHalloweenMode
                ? 'bg-halloween-orange hover:bg-halloween-purple text-white'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              {isHalloweenMode ? 'Conjure' : 'Deploy'}
            </Button>
            <span className={`text-[10px] ${isHalloweenMode
              ? 'text-halloween-ghost/60'
              : 'text-gray-400 dark:text-gray-500'
              }`}>
              {isHalloweenMode ? 'MIT Licensed Curse' : 'MIT Licensed'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfHostSection;