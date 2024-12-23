"use server"

import { cookies } from "next/headers";
import { cache } from 'react';
import { adminAuth } from "@/firebase/server/config";

export const validateUserServerSide = cache(async () => {
  const authToken = (await cookies()).get('__session');

  if (!authToken) {
    console.warn('No auth cookie found found. User must not be authenticated.');
    return null;
  }

  try {
    const user = await adminAuth.verifyIdToken(authToken.value);
    
    if (!user.uid) {
      console.warn('No user id was found');
      return false;
    }
  
    if (!user.email) {
      console.warn('No user email was found');
      return false
    }
  
    const current_time = Math.floor(Date.now() / 1000);
    if (user.exp < current_time) {
      console.warn('Token has expired');
      return false
    }
  
    if (user.authTime > current_time) {
      console.warn('Invalid auth time');
      return false
    }

    return user;
  } catch(error) {
    console.error('An error occurred while validating the user:', error);
    return null;
  }
})

