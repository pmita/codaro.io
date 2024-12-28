"use server"

import { validateUserServerSide } from "../auth/auth";
import { adminDb, deleteField } from "@/firebase/server/config";

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

export const getIsChapterCompleted = async (chapterId: string) => {
  const completedChapters = await getCompletedChapters();

  return completedChapters?.[chapterId] === true;
}

export const toggleChapterProgress = async (chapterId: string, isCompleted: boolean) => {
  const user = await validateUserServerSide();

  if (!user) {
    return null;
  }

  const docRef = adminDb.collection('progression').doc(user.uid);

  try {
    await docRef.set({
      [chapterId]: isCompleted ? deleteField() : !isCompleted
    }, { merge: true });
  }catch (error) {
    console.log(error);
  }
}