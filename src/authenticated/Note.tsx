import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Id } from '../../convex/_generated/dataModel';
import NoteControls from './NoteControls';

interface NoteProps {
    note: {
        _id: Id<"notes"> | 'tempId';
        content: string;
        color: string;
        position: { x: number; y: number };
        size: { width: number; height: number };
        zIndex: number;
    };
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (noteId: Id<"notes"> | 'tempId', updates: any) => void;
    onDelete: (noteId: Id<"notes"> | 'tempId') => void;
    setIsDragging: (isDragging: boolean) => void;
}

const Note: React.FC<NoteProps> = ({ note, isSelected, onSelect, onUpdate, onDelete, setIsDragging }) => {
    const [isDragging, setIsNoteDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeHandle, setResizeHandle] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const noteRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (noteRef.current && !isResizing) {
            const rect = noteRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            setIsNoteDragging(true);
            setIsDragging(true);
            onSelect();
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging && noteRef.current) {
            const parentRect = noteRef.current.offsetParent?.getBoundingClientRect();
            if (parentRect) {
                const newX = e.clientX - parentRect.left - dragOffset.x;
                const newY = e.clientY - parentRect.top - dragOffset.y;
                requestAnimationFrame(() => {
                    onUpdate(note._id, { position: { x: newX, y: newY } });
                });
            }
        } else if (isResizing && noteRef.current) {
            const parentRect = noteRef.current.offsetParent?.getBoundingClientRect();
            if (parentRect) {
                let newWidth = note.size.width;
                let newHeight = note.size.height;
                let newX = note.position.x;
                let newY = note.position.y;

                if (resizeHandle?.includes('e')) {
                    newWidth = e.clientX - parentRect.left - note.position.x;
                }
                if (resizeHandle?.includes('s')) {
                    newHeight = e.clientY - parentRect.top - note.position.y;
                }
                if (resizeHandle?.includes('w')) {
                    newWidth = note.size.width + (note.position.x - (e.clientX - parentRect.left));
                    newX = e.clientX - parentRect.left;
                }
                if (resizeHandle?.includes('n')) {
                    newHeight = note.size.height + (note.position.y - (e.clientY - parentRect.top));
                    newY = e.clientY - parentRect.top;
                }

                onUpdate(note._id, {
                    size: { width: Math.max(newWidth, 100), height: Math.max(newHeight, 100) },
                    position: { x: newX, y: newY }
                });
                requestAnimationFrame(() => {
                    onUpdate(note._id, {
                        size: { width: Math.max(newWidth, 100), height: Math.max(newHeight, 100) },
                        position: { x: newX, y: newY }
                    });
                });
            }
        }
    }, [isDragging, isResizing, note._id, onUpdate, dragOffset]);

    const handleMouseUp = () => {
        setIsNoteDragging(false);
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onUpdate(note._id, { content: e.target.value });
        setIsTyping(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    const handleResizeStart = (handle: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeHandle(handle);
        onSelect();
    };

    return (
        <div
            ref={noteRef}
            style={{
                position: 'absolute',
                left: note.position.x,
                top: note.position.y,
                width: note.size.width,
                height: note.size.height,
                backgroundColor: note.color,
                zIndex: note.zIndex,
            }}
            className={`p-2 rounded-md shadow-lg transition-shadow duration-200 group ${isSelected ? ' shadow-xl' : ''}`}
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}
        >
            <textarea
                value={note.content}
                onChange={handleTextareaChange}
                className="w-full h-full resize-none bg-transparent outline-none text-gray-800"
            />
            {isSelected && (
                <>
                    <div className="absolute top-0 left-0 w-full h-full border-2 border-yellow-500 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-white border-2 border-yellow-500 rounded-full cursor-nwse-resize" onMouseDown={handleResizeStart('nw')}></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-white border-2 border-yellow-500 rounded-full cursor-nesw-resize" onMouseDown={handleResizeStart('ne')}></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-white border-2 border-yellow-500 rounded-full cursor-nesw-resize" onMouseDown={handleResizeStart('sw')}></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-white border-2 border-yellow-500 rounded-full cursor-nwse-resize" onMouseDown={handleResizeStart('se')}></div>
                </>
            )}
            {isSelected && !isTyping && (
                <NoteControls
                    noteId={note._id}
                    zIndex={note.zIndex}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
};

export default Note;