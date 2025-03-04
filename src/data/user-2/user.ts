"use server"

import { adminDb } from "@/firebase/server/config";
import { validateUserServerSide } from "../auth";
import { UserData } from "@/types/firestore";

export const getUser = async (): Promise<UserData | null> => {
  const user = await validateUserServerSide();

  if (!user) {
    return null;
  }

  const userDocRef = adminDb.collection('users').doc(user.uid);
  const usersData = (await userDocRef.get()).data();

  return {
    ...usersData,
    expires: usersData?.expires?.toMillis() ?? null
  };
}