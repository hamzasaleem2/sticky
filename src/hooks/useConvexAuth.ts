import { useAuth, useUser } from "@clerk/clerk-react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";

export function useConvexAuth() {
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);

  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);

  useEffect(() => {
    if (!clerkLoaded) return;

    if (isSignedIn && user) {
      const userName = getUserName(user);
      createOrUpdateUser({
        tokenIdentifier: user.id,
        name: userName,
        email: user.primaryEmailAddress?.emailAddress,
        profileImageUrl: user.imageUrl,
      }).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [clerkLoaded, isSignedIn, user, createOrUpdateUser]);

  return {
    isLoaded: isLoaded && clerkLoaded,
    isAuthenticated: isSignedIn,
    user: isSignedIn ? user : null,
  };
}

function getUserName(user: any): string {
  if (user.fullName) return user.fullName;
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
  if (user.firstName) return user.firstName;
  if (user.username) return user.username;
  if (user.emailAddresses && user.emailAddresses.length > 0) {
    return user.emailAddresses[0].emailAddress.split('@')[0];
  }
  return "Anonymous User";
}