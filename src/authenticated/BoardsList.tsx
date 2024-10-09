import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import Logo from '../components/logo';
import { Button } from '../components/ui/button';
import Footer from '../components/lander/footer';
import { Search, Plus, Trash2, Folder, RefreshCw } from 'lucide-react';
import Input from '../components/ui/input';
import Dropdown from '../components/ui/dropdown';
import { usePaginatedQuery, useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { formatLastModified } from '../libs/utils';
import EmptyState from '../components/EmptyState';

const BoardsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'Recent' | 'Oldest' | 'Alphabetical' | 'Most Notes'>('Recent');
    const [showTrashed, setShowTrashed] = useState(false);

    const { results, status, loadMore } = usePaginatedQuery(
        api.boards.getLazyBoards,
        { searchTerm, sortBy, showTrashed },
        { initialNumItems: 10 }
    );

    const createBoard = useMutation(api.boards.createBoard);
    const deleteBoard = useMutation(api.boards.deleteBoard);
    const updateBoard = useMutation(api.boards.updateBoard);
    const restoreBoard = useMutation(api.boards.restoreBoard);
    const permanentlyDeleteBoard = useMutation(api.boards.permanentlyDeleteBoard);
    const userBoardsCount = useQuery(api.boards.getUserBoardsCount, {}) || 0;
    const userBoardsTrashCount = useQuery(api.boards.getUserBoardsTrashCount, {}) || 0;
    const [newBoardId, setNewBoardId] = useState<Id<"boards"> | null>(null);

    const handleCreateBoard = useCallback(async () => {
        const newBoardName = `New Board`;
        const newBoardId = await createBoard({ name: newBoardName });
        return newBoardId;
    }, [createBoard]);

    const handleDeleteBoard = useCallback(async (boardId: Id<"boards">) => {
        await deleteBoard({ boardId });
    }, [deleteBoard]);

    const handleEditBoard = useCallback(async (boardId: Id<"boards">, newName: string) => {
        if (newName.trim() !== '') {
            await updateBoard({ boardId, name: newName });
        }
    }, [updateBoard]);

    const handleRestoreBoard = useCallback(async (boardId: Id<"boards">) => {
        await restoreBoard({ boardId });
    }, [restoreBoard]);

    const handlePermanentlyDeleteBoard = useCallback(async (boardId: Id<"boards">) => {
        await permanentlyDeleteBoard({ boardId });
    }, [permanentlyDeleteBoard]);

    const handleSortChange = useCallback((option: string) => {
        setSortBy(option as 'Recent' | 'Oldest' | 'Alphabetical' | 'Most Notes');
    }, []);

    const LoadingIndicator = () => (
        <div className="flex justify-center items-center mt-8">
            <div className="flex relative w-16 h-16 items-center">
                <Logo className="w-8 h-8 text-purple-500" />
                <span>Loading...</span>
            </div>
        </div>
    );

    const sortOptions = [
        { name: 'Recent', link: '#' },
        { name: 'Oldest', link: '#' },
        { name: 'Alphabetical', link: '#' },
        { name: 'Most Notes', link: '#' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <Logo className="h-8 w-8 mr-2" />
                            <span className="text-lg font-bold text-gray-600 dark:text-gray-300">Sticky </span>
                            <span className="ml-2 inline-flex items-center rounded text-xs font-medium">
                                Beta
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button onClick={async () => {
    const boardId = await handleCreateBoard();
    setNewBoardId(boardId);
}} size="sm" className="flex items-center">
    <Plus className="w-4 h-4 mr-2" />
    <span className="inline">New Board</span>
</Button>
                            <UserButton />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Boards</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                        <div className="relative mb-4 sm:mb-0">
                            <Input
                                placeholder="Search boards..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-full w-full sm:w-auto"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <Dropdown
                            items={sortOptions}
                            text={`Sort: ${sortBy}`}
                            onSelect={handleSortChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Organize</h2>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    onClick={() => setShowTrashed(false)}
                                    className="w-full flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <Folder className="w-4 h-4 mr-2" />
                                        All Boards
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full">
                                        {userBoardsCount}
                                    </span>
                                </Button>
                            </li>
                            <li>
                                <Button onClick={() => setShowTrashed(true)} className="w-full flex items-ceneter justify-between bg-red-500 hover:bg-red-600">
                                    <div className="flex items-center">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Trash
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full">
                                        {userBoardsTrashCount}
                                    </span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-3/4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            {showTrashed ? 'Trashed Boards' : `${sortBy} Boards`}
                        </h2>
                        <div className="h-[calc(100vh-300px)] overflow-y-auto">
                            {status === "LoadingFirstPage" || status === "LoadingMore" ? (
                                <LoadingIndicator />
                            ) : results.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                                    {results?.map((board) => (
    <div key={board._id} className={`block ${board._id === newBoardId ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    <input
                        type="text"
                        defaultValue={board.name}
                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md focus:p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:p-2"
                        onBlur={(e) => handleEditBoard(board._id, e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.currentTarget.blur();
                            }
                        }}
                    />
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-xs">
                    Last modified: {formatLastModified(board.lastModified)}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {board.notesCount === 1 ? '1 note' : `${board.notesCount || 0} notes`}
                    </span>
                    <div className="flex space-x-2">
                        {showTrashed ? (
                            <>
                                <Button size="sm" onClick={() => handleRestoreBoard(board._id)}>
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                                <Button size="sm" onClick={() => handlePermanentlyDeleteBoard(board._id)} className="bg-red-500 hover:bg-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to={`/board/${board._id}`}>
                                    <Button 
                                        size="sm" 
                                        className={`flex items-center ${board._id === newBoardId ? 'bg-purple-500 hover:bg-purple-600' : ''}`}
                                        onClick={() => setNewBoardId(null)}
                                    >
                                        <Folder className="w-4 h-4 mr-1" />
                                        Open
                                    </Button>
                                </Link>
                                <Button size="sm" onClick={() => handleDeleteBoard(board._id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
))}
                                </div>
                            ) : (
                                <EmptyState
                                    message={showTrashed ? "Your trash is empty. Deleted boards will appear here." : "You don't have any boards yet. Create one to get started!"}
                                    buttonText={showTrashed ? undefined : "Create New Board"}
                                    onButtonClick={showTrashed ? undefined : handleCreateBoard}
                                />
                            )}
                        </div>
                        {status === "CanLoadMore" && (
                            <div className="mt-4 text-center">
                                <Button onClick={() => loadMore(10)}>Load More</Button>
                            </div>
                        )}
                        {status === "LoadingMore" && <LoadingIndicator />}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BoardsList;