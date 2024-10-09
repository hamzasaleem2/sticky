import React, { useState } from 'react';
import { Id } from "../../convex/_generated/dataModel";
import Avatar from './ui/avatar';
import { Button } from './ui/button';
import Modal from './ui/modal';

interface ActiveUser {
    _id: Id<"users">;
    name: string;
    profileImageUrl: string;
}

interface UserStackProps {
    activeUsers: ActiveUser[];
    currentUserId: Id<"users">;
}

const UserStack: React.FC<UserStackProps> = ({ activeUsers, currentUserId }) => {
    const [hoveredUser, setHoveredUser] = useState<Id<"users"> | null>(null);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const maxVisibleUsers = 2;

    const sortedUsers = [...activeUsers].sort((a, b) => a._id.localeCompare(b._id));

    if (sortedUsers.length === 0) {
        return null;
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-md p-2">
            <div className="flex -space-x-2 relative">
                {sortedUsers.slice(0, maxVisibleUsers).map((user) => (
                    <div
                        key={user._id}
                        className="relative"
                        onMouseEnter={() => setHoveredUser(user._id)}
                        onMouseLeave={() => setHoveredUser(null)}
                    >
                        <Avatar
                            className="w-8 h-8 border-2 border-white dark:border-gray-800 rounded-full"
                            imageUrl={user.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                        />
                        {hoveredUser === user._id && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
                                {user._id === currentUserId ? `${user.name} (You)` : user.name}
                            </div>
                        )}
                    </div>
                ))}
                {sortedUsers.length > maxVisibleUsers && (
                    <Button
                        onClick={() => setShowAllUsers(true)}
                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-gray-800 text-sm font-medium text-gray-800 flex items-center justify-center"
                    >
                        +{sortedUsers.length - maxVisibleUsers}
                    </Button>
                )}
            </div>

            <Modal active={showAllUsers} setActive={setShowAllUsers}>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                    Active Users
                </h3>
                <div className="max-h-60 overflow-y-auto">
                    {sortedUsers.map((user) => (
                        <div key={user._id} className="flex items-center space-x-3 mb-2">
                            <Avatar
                                className="w-8 h-8"
                                imageUrl={user.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                            />
                            <span>{user._id === currentUserId ? `${user.name} (You)` : user.name}</span>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default UserStack;