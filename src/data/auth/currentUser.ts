"use server"

import { adminAuth } from "@/firebase/server/config";
import { validateUserSession } from "./sessions";

export const getCurrentUser = async () => {
  const decodedIdToken = await validateUserSession();

  if (!decodedIdToken) {
    console.warn('No decoded token was found');
    return null;
  }

  try {
    const currentUser = await adminAuth.getUser(decodedIdToken.uid);
    
    if (!currentUser.uid) {
      console.warn('No user id was found');
      return null;
    }
  
    if (!currentUser.email) {
      console.warn('No user email was found');
      return null;
    }

    return currentUser;
  } catch(error) {
    console.error('An error occurred while validating the user:', error);
    return null;
  }
};

