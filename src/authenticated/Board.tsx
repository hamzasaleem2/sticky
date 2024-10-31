import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import Note from './Note';
import ToolsBar from './ToolsBar';
import { UserButton } from '@clerk/clerk-react';
import Logo from '../components/logo';
import { usePresence } from '../hooks/usePresence';
import Modal from '../components/ui/modal';
import { Button } from '../components/ui/button';
import UserStack from '../components/UserStack';
import UserCursor, { COLORS } from '../components/UserCursor';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { HelpCircle } from 'lucide-react';
import HelpModal from '../components/HelpModal';

interface WhiteboardProps {
    boardId: Id<"boards">;
}

const generateShareLink = (code: string) => `${window.location.origin}/board?shareCode=${code}`;

const Whiteboard: React.FC<WhiteboardProps> = ({ boardId }) => {
    const currentUser = useQuery(api.users.getCurrentUser);
    const [actualBoardId, setActualBoardId] = useState<Id<"boards">>(boardId);
    const boardOwner = useQuery(api.boards.getBoardOwner, { boardId: actualBoardId });
    const shareBoard = useMutation(api.boardSharing.shareBoard);
    const board = useQuery(api.boards.getBoard, { boardId: actualBoardId });
    const getSharedBoardId = useQuery(api.boardSharing.getSharedBoardId,
        { shareCode: new URLSearchParams(window.location.search).get('shareCode') || '' }
    );
    const isLoading = currentUser === undefined || board === undefined;
    const [error, setError] = useState<string | null>(null);
    const notes = useQuery(api.notes.getNotes, { boardId: actualBoardId });
    const createNote = useMutation(api.notes.createNote).withOptimisticUpdate((localStore, args) => {
        const existingNotes = localStore.getQuery(api.notes.getNotes, { boardId: actualBoardId }) || [];
        const tempId = `temp_${Date.now()}` as Id<"notes">;
        const now = Date.now();
        localStore.setQuery(api.notes.getNotes, { boardId: actualBoardId }, [...existingNotes, { _id: tempId, _creationTime: now, ...args }]);
    });
    const updateNote = useMutation(api.notes.updateNote).withOptimisticUpdate((localStore, args) => {
        const existingNotes = localStore.getQuery(api.notes.getNotes, { boardId: actualBoardId }) || [];
        const updatedNotes = existingNotes.map(note =>
            note._id === args.noteId ? { ...note, ...args } : note
        );
        localStore.setQuery(api.notes.getNotes, { boardId: actualBoardId }, updatedNotes);
    });
    const deleteNote = useMutation(api.notes.deleteNote).withOptimisticUpdate((localStore, args) => {
        const existingNotes = localStore.getQuery(api.notes.getNotes, { boardId: actualBoardId }) || [];
        const updatedNotes = existingNotes.filter(note => note._id !== args.noteId);
        localStore.setQuery(api.notes.getNotes, { boardId: actualBoardId }, updatedNotes);
    });
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const toggleBoardSharing = useMutation(api.boardSharing.toggleBoardSharing);
    const [isSharingEnabled, setIsSharingEnabled] = useState(false);
    const isShared = board?.isShared ?? false;
    const [isViewingSharedBoard, setIsViewingSharedBoard] = useState(false);
    const [sharedByUser, setSharedByUser] = useState<string | null>(null);
    const inTrash = board?.inTrash;
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    useEffect(() => {
        if (board === null) {
            setError("You don't have access to this board or it doesn't exist.");
        } else {
            setError(null);
        }
    }, [board]);

    useEffect(() => {
        if (board) {
            setIsSharingEnabled(board.isShared);
            if (isViewingSharedBoard && boardOwner) {
                setSharedByUser(boardOwner);
            }
        }
    }, [board, isViewingSharedBoard, boardOwner]);

    useEffect(() => {
        if (getSharedBoardId !== null && getSharedBoardId !== undefined) {
            setActualBoardId(getSharedBoardId);
            setIsViewingSharedBoard(true);
        } else if (boardId) {
            setActualBoardId(boardId);
            setIsViewingSharedBoard(false);
        }
    }, [getSharedBoardId, boardId]);

    const [selectedNote, setSelectedNote] = useState<Id<"notes"> | 'tempId' | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const boardRef = useRef<HTMLDivElement>(null);
    const [currentTool, setCurrentTool] = useState<'note' | null>(null);
    const { activeUsers, updateCursorPosition } = usePresence(boardId, isShared);

    const useStableColorAssignment = (activeUsers: any[] | undefined) => {
        const colorAssignments = useRef(new Map<Id<"users">, string>());
        const colorIndex = useRef(0);

        useEffect(() => {
            if (activeUsers) {
                activeUsers.forEach((user) => {
                    if (!colorAssignments.current.has(user._id)) {
                        colorAssignments.current.set(user._id, COLORS[colorIndex.current % COLORS.length]);
                        colorIndex.current = (colorIndex.current + 1) % COLORS.length;
                    }
                });
            }
        }, [activeUsers]);

        return colorAssignments.current;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (boardRef.current) {
                const rect = boardRef.current.getBoundingClientRect();
                const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
                const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                updateCursorPosition({ x, y });
            }
        };

        boardRef.current?.addEventListener('mousemove', handleMouseMove);
        boardRef.current?.addEventListener('touchmove', handleMouseMove);

        return () => {
            boardRef.current?.removeEventListener('mousemove', handleMouseMove);
            boardRef.current?.removeEventListener('touchmove', handleMouseMove);
        };
    }, [updateCursorPosition]);

    const handleCreateNote = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (boardRef.current && currentTool && !isDragging) {
            const rect = boardRef.current.getBoundingClientRect();
            let clientX, clientY;

            if ('touches' in e) {
                // Touch event
                if (e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    return; // Exit if there are no touches
                }
            } else {
                // Mouse event
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
                createNote({
                    boardId: actualBoardId,
                    content: '',
                    color: '#ffff88',
                    position: { x, y },
                    size: { width: 200, height: 200 },
                    zIndex: notes ? Math.max(...notes.map(note => note.zIndex ?? 0), 0) + 1 : 1,
                }).catch(error => console.error("Error creating note:", error));
                setCurrentTool(null);
            }
        }
    };

    const updateShareLink = useCallback(async () => {
        if (isSharingEnabled && board?.shareCode) {
            setShareLink(generateShareLink(board.shareCode));
        } else if (isSharingEnabled) {
            const code = await shareBoard({ boardId: actualBoardId });
            setShareLink(generateShareLink(code));
        }
    }, [isSharingEnabled, board?.shareCode, shareBoard, actualBoardId]);


    const handleShareBoard = async () => {
        if (!isSharingEnabled) {
            const isShared = await toggleBoardSharing({ boardId: actualBoardId });
            setIsSharingEnabled(isShared);
        }
        await updateShareLink();
        setIsShareModalOpen(true);
    };

    useEffect(() => {
        if (isShareModalOpen) {
            updateShareLink();
        }
    }, [isShareModalOpen, updateShareLink]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
    };

    const handleSetIsDragging = (dragging: boolean) => {
        setIsDragging(dragging);
    };

    const handleUpdateNote = useCallback((noteId: Id<"notes"> | 'tempId', updates: Partial<{
        content: string;
        color: string;
        position: { x: number; y: number };
        size: { width: number; height: number };
    }>) => {
        if (noteId !== "tempId") {
            updateNote({ noteId, ...updates }).catch(error => console.error("Error updating note:", error));
        }
    }, [updateNote]);

    const handleDeleteNote = (noteId: Id<"notes"> | 'tempId') => {
        if (noteId !== 'tempId') {
            deleteNote({ noteId }).catch(error => console.error("Error deleting note:", error));
        }
        if (selectedNote === noteId) {
            setSelectedNote(null);
        }
    };

    const userColors = useStableColorAssignment(activeUsers);

    if (inTrash) {
        return <ErrorMessage message='Board is Trashed.' />
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={`relative h-screen w-full overflow-hidden ${currentTool === 'note' ? 'cursor-pointer' : ''}`}>
                {isShared && activeUsers?.map(user => (
                    user._id !== currentUser?._id && (
                        <UserCursor
                            key={user._id}
                            position={user.cursorPosition}
                            color="#FF0000"
                            name={user.name}
                        />
                    )
                ))}
                <div className={`absolute ${isViewingSharedBoard ? 'top-12' : 'top-4'} left-4 z-10 flex items-center space-x-2`}>
                    <Link to="/boards" className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Logo className="h-6 w-6" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                <div className={`absolute ${isViewingSharedBoard ? 'top-12' : 'top-4'} right-4 z-10 flex items-center space-x-2 gap-4`}>
                    <UserStack
                        activeUsers={(activeUsers || []).map(user => ({
                            ...user,
                            profileImageUrl: user.profileImageUrl ?? ''
                        }))}
                        currentUserId={currentUser?._id as Id<"users">}
                    />
                    {!isLoading && board && (
                        <div className="flex items-center space-x-2">
                            {currentUser && board.ownerId === currentUser._id && (
                                <Button onClick={handleShareBoard}>
                                    {isSharingEnabled ? 'Manage Sharing' : 'Share'}
                                </Button>
                            )}
                            {isSharingEnabled && currentUser && board.ownerId === currentUser._id && (
                                <Button onClick={async () => {
                                    await toggleBoardSharing({ boardId: actualBoardId });
                                    setIsSharingEnabled(false);
                                    setShareLink('');
                                }} className="bg-red-500 hover:bg-red-600">
                                    Disable Sharing
                                </Button>
                            )}
                        </div>
                    )}
                    <Button onClick={() => setHelpModalOpen(true)} className="bg-main hover:bg-mainAccent">
                        <HelpCircle className="w-5 h-5" />
                    </Button>
                    <UserButton />
                </div>
                <div
                    ref={boardRef}
                    className="absolute inset-0"
                    onClick={handleCreateNote}
                    onTouchStart={handleCreateNote}
                >
                    {notes?.map((note) => (
                        <Note
                            key={note._id}
                            note={{ ...note, zIndex: note.zIndex ?? 0 }}
                            isSelected={selectedNote === note._id}
                            onSelect={() => setSelectedNote(note._id)}
                            onUpdate={handleUpdateNote}
                            onDelete={handleDeleteNote}
                            setIsDragging={handleSetIsDragging}
                        />
                    ))}
                    {activeUsers?.filter(user => user._id !== currentUser?._id).map((user) => {
                        const color = userColors.get(user._id) || COLORS[0];
                        return (
                            <UserCursor
                                key={user._id}
                                position={user.cursorPosition}
                                color={color}
                                name={user.name}
                            />
                        );
                    })}
                    {/* {currentUser && (
                        <UserCursor
                            key={currentUser._id}
                            position={localCursorPosition} // comes from usePresence hook!
                            color={userColors.get(currentUser._id) || COLORS[0]}
                            name={currentUser.name}
                        />
                    )} */}
                </div>
                {isViewingSharedBoard && (
                    <div className="fixed top-0 left-0 right-0 bg-[#a17fbc] text-text py-1 px-2 flex justify-between items-center z-40 text-xs">
                        <span>Shared by {sharedByUser}</span>
                        <Button onClick={() => window.location.href = '/boards'} className="text-xs py-0 px-2 h-6">
                            My Boards
                        </Button>
                    </div>
                )}
                <ToolsBar
                    onCreate={() => { setCurrentTool('note') }}
                    currentTool={currentTool}
                    onDeselectTool={() => setCurrentTool(null)}
                />
            </div>
            <Modal active={isShareModalOpen} setActive={setIsShareModalOpen}>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                    Share Board
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                    Copy the link below to share this board:
                </p>
                <div className="flex w-min items-center rounded-base border-2 overflow-x-hidden border-border dark:border-darkBorder font-base shadow-light dark:shadow-dark">
                    <input
                        className='p-2'
                        type="text"
                        value={shareLink}
                        disabled
                    />
                    <button
                        className="border-l-2 text-text border-border dark:border-darkBorder bg-main p-[10px] sm:px-5 px-3"
                        onClick={copyToClipboard}
                    >
                        Copy
                    </button>
                </div>
            </Modal>
            <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
        </>
    );
};

export default Whiteboard;