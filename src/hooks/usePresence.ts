import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useCallback, useRef, useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import debounce from 'lodash.debounce';

const PRESENCE_UPDATE_INTERVAL = 100;
const HEARTBEAT_INTERVAL = 30000;

export function usePresence(boardId: Id<"boards">, isShared: boolean) {
  const updatePresence = useMutation(api.presence.updatePresence);
  const removePresence = useMutation(api.presence.removePresence);
  const activeUsers = useQuery(api.presence.getActiveUsers, { boardId });
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const [localCursorPosition, setLocalCursorPosition] = useState({ x: 0, y: 0 });

  const debouncedUpdatePresence = useCallback(
    debounce((position: { x: number; y: number }) => {
      if (isShared) {
        updatePresence({
          boardId,
          cursorPosition: position,
          isHeartbeat: false
        });
      }
    }, PRESENCE_UPDATE_INTERVAL, { maxWait: PRESENCE_UPDATE_INTERVAL * 2 }),
    [boardId, updatePresence, isShared]
  );

  const updateCursorPosition = useCallback((position: { x: number; y: number }) => {
    cursorPositionRef.current = position;
    setLocalCursorPosition(position);
    if (isShared) {
      debouncedUpdatePresence(position);
    }
  }, [debouncedUpdatePresence, isShared]);

  useEffect(() => {
    if (!isShared) return;

    const heartbeatInterval = setInterval(() => {
      updatePresence({
        boardId,
        cursorPosition: cursorPositionRef.current,
        isHeartbeat: true
      });
    }, HEARTBEAT_INTERVAL);
  
    return () => {
      clearInterval(heartbeatInterval);
      removePresence({ boardId });
    };
  }, [boardId, updatePresence, removePresence, isShared]);

  return {
    activeUsers: isShared ? activeUsers : [],
    updateCursorPosition,
    localCursorPosition
  };
}