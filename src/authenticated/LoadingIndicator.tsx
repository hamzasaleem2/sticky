import Logo from '../components/logo';
import { useHalloween } from '../providers/halloween-provider';
import { Ghost, Loader } from 'lucide-react';

export const LoadingIndicator = () => {
    const { isHalloweenMode } = useHalloween();

    return (
        <div className="flex justify-center items-center mt-8">
            {isHalloweenMode ? (
                <div className="flex flex-col items-center space-y-4">
                    <Ghost className="w-12 h-12 text-halloween-orange animate-float" />
                    <p className="text-halloween-ghost halloween-glow">Summoning your boards...</p>
                </div>
            ) : (
                <div className="flex relative w-16 h-16 items-center">
                    <Logo className="w-8 h-8 text-purple-500" />
                    <Loader className="animate-spin ml-2" />
                </div>
            )}
        </div>
    );
};