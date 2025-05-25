"use server"

// DATA
import { validateSession } from "../services/session-service";
// LIB
import { adminAuth } from "@/lib/firebase/server/config";


export const getCurrentUser = async () => {
  const decodedIdToken = await validateSession();

  if (!decodedIdToken) {
    console.warn('No auth cookie found, please log in');
    return null;
  }

  try {
    const currentUser = await adminAuth.getUser(decodedIdToken.uid);
    
    if (!currentUser.uid || !currentUser.email) {
      console.warn('No user id was found');
      return null;
    }
  
    if (!currentUser.email) {
      console.warn('No user email was found');
      return null;
    }

    return {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      emailVerified: currentUser.emailVerified,
    }
  } catch(error) {
    console.warn(`An error occurred while fetching the user: ${(error as Error).message}`);
    return null;
  }
};

