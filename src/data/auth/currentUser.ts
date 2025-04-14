"use server"

import { adminAuth } from "@/lib/firebase/server/config";
import { validateUserSession } from "./sessions";

export const getCurrentUser = async () => {
  const decodedIdToken = await validateUserSession();

  if (!decodedIdToken) {
    console.warn('No auth cookie found, please log in');
    return;
  }

  try {
    const currentUser = await adminAuth.getUser(decodedIdToken.uid);
    
    if (!currentUser.uid) {
      throw new Error('No user id was found');
    }
  
    if (!currentUser.email) {
      throw new Error('No user email was found');
    }

    return {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      emailVerified: currentUser.emailVerified,
    }
  } catch(error) {
    throw new Error(`An error occurred while fetching the user: ${(error as Error).message}`);
  }
};

