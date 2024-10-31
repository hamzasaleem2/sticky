import { useHalloween } from '../providers/halloween-provider';

const HalloweenDecorations = () => {
    const { isHalloweenMode } = useHalloween();

    if (!isHalloweenMode) return null;

    const decorations = [
        { emoji: '👻', position: 'top-20 left-10', delay: 'delay-0' },
        { emoji: '🎃', position: 'top-40 right-20', delay: 'delay-1000' },
        { emoji: '🦇', position: 'bottom-20 left-30', delay: 'delay-2000' },
        { emoji: '💀', position: 'bottom-40 right-30', delay: 'delay-3000' },
        { emoji: '🕸️', position: 'top-60 left-1/4', delay: 'delay-4000' },
        { emoji: '🕯️', position: 'bottom-60 right-1/4', delay: 'delay-5000' },
    ];

    if (location.pathname.includes('/board')) {
        return (
            <>
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-halloween-ghost to-transparent opacity-20 animate-fog-roll" />
                    <div className="absolute inset-0 bg-gradient-to-b from-halloween-purple/10 to-transparent mix-blend-overlay" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {decorations.map((decoration, index) => (
                    <div key={index} className={`ghost-container ${decoration.position}`}>
                        <div className={`animate-float ${decoration.delay} text-4xl opacity-60 hover:opacity-100 transition-opacity`}>
                            {decoration.emoji}
                        </div>
                    </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-halloween-ghost to-transparent opacity-20 animate-fog-roll" />
                <div className="absolute inset-0 bg-gradient-to-b from-halloween-purple/10 to-transparent mix-blend-overlay" />
            </div>
        </>
    );
};

export default HalloweenDecorations;