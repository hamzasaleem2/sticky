import NoteButton from "./NoteButton";

interface Props {
    onCreate: () => void;
    currentTool: 'note' | null;
    onDeselectTool: () => void;
}

const ToolsBar: React.FC<Props> = ({ onCreate, currentTool, onDeselectTool }) => {
    return (
        <div
            className="absolute bottom-6 left-0 right-0 flex items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-transparent flex items-center justify-center pointer-events-auto">
                <NoteButton
                    isActive={currentTool === 'note'}
                    onClick={() => currentTool === 'note' ? onDeselectTool() : onCreate()}
                    currentTool={currentTool}
                />
            </div>
        </div>
    );
}

export default ToolsBar;