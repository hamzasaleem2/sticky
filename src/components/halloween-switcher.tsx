import { useHalloween } from '../providers/halloween-provider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function HalloweenSwitcher() {
  const { isHalloweenMode, toggleHalloweenMode } = useHalloween();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleHalloweenMode}
            className={`
              flex items-center justify-center h-8 w-8
              rounded-full border-2 transition-all
              ${isHalloweenMode ? 
                'bg-halloween-orange border-halloween-purple hover:bg-halloween-purple animate-spooky-shake' : 
                'bg-white border-border hover:border-halloween-orange dark:border-darkBorder dark:bg-secondaryBlack'
              }
            `}
          >
            <span className="text-xl">{isHalloweenMode ? '🎃' : '👻'}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isHalloweenMode ? 'Disable' : 'Enable'} Halloween mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}