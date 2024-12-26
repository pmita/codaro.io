"use server"

import { adminDb } from "@/firebase/server/config";
import { validateUserServerSide } from "../auth/auth"

export const getCompletedChapters = async () => {
  const user = await validateUserServerSide();

  if (!user) {
    return null;
  }

  let progressData = null;

  if (user) {
    const docRef = adminDb.collection('progression').doc(user.uid);
    progressData = (await docRef.get()).data();
  }
  
  return progressData as FirebaseFirestore.DocumentData | null;
}