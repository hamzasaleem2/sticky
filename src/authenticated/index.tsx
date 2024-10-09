import React, { useEffect, useState } from 'react';
import { SignedIn } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Whiteboard from './Board';
import { Id } from '../../convex/_generated/dataModel';
import BoardsList from './BoardsList';
import { useParams, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import FeedbackModal from '../components/FeedbackModal';

const AuthenticatedApp: React.FC = () => {
  const [boardId, setBoardId] = useState<Id<"boards"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const boards = useQuery(api.boards.getBoards);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shareCode = searchParams.get('shareCode') || '';
  const sharedBoardId = useQuery(api.boardSharing.getSharedBoardId, { shareCode });
  const [shareCodeError, setShareCodeError] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    const initializeBoard = async () => {
      setIsLoading(true);
      if (shareCode) {
        if (sharedBoardId === undefined) {
          return;
        }
        if (sharedBoardId === null) {
          setShareCodeError("Invalid share code. The board you're trying to access doesn't exist or has been deleted.");
          setIsLoading(false);
          return;
        }
        setBoardId(sharedBoardId);
        setShareCodeError(null);
      } else if (id) {
        setBoardId(id as Id<"boards">);
      } else if (location.pathname === '/boards' || location.pathname === '/board') {
        setBoardId(null);
      }
      setIsLoading(false);
    };
    initializeBoard();
  }, [boards, sharedBoardId, shareCode, id, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SignedIn>
      {shareCodeError ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{shareCodeError}</span>
          </div>
        </div>
      ) : boardId ? (
        <Whiteboard boardId={boardId} />
      ) : (
        <BoardsList />
      )}
          <button
                onClick={() => setIsFeedbackModalOpen(true)}
                className="fixed bottom-4 right-4 bg-main hover:bg-mainAccent text-text p-3 rounded-full shadow-md transition-colors duration-200"
            >
                <MessageCircle size={24} />
            </button>
            <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
    </SignedIn>
  );
};

export default AuthenticatedApp;