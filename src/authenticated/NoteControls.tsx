import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, MoreHorizontal } from 'lucide-react';
import { Id } from '../../convex/_generated/dataModel';

interface NoteControlsProps {
  noteId: Id<"notes"> | 'tempId';
  zIndex: number;
  onUpdate: (noteId: Id<"notes"> | 'tempId', updates: any) => void;
  onDelete: (noteId: Id<"notes"> | 'tempId') => void;
}

const NoteControls: React.FC<NoteControlsProps> = ({ noteId, zIndex, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: 'Yellow', value: '#ffff88' },
    { name: 'Pink', value: '#ff7eb9' },
    { name: 'Blue', value: '#7afcff' },
    { name: 'Green', value: '#98fb98' },
  ];

  return (
    <div className="absolute bottom-2 right-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <MoreHorizontal className="w-5 h-5 dark:text-white text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col items-end">
          <div className="flex space-x-1 mb-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onUpdate(noteId, { color: color.value })}
                className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onUpdate(noteId, { zIndex: zIndex + 1 })}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Bring forward"
            >
              <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => onUpdate(noteId, { zIndex: Math.max(0, zIndex - 1) })}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Send backward"
            >
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => onDelete(noteId)}
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteControls;