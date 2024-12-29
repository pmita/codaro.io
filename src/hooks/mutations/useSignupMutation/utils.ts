import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthActionTypes } from "@/context/auth-context/types";
import { useAuth } from "../../useAuth";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/client/config";
import { doc, setDoc } from "firebase/firestore";
import { ISignUpForm } from "@/components/forms/signup-form/types";

export const createUser = async (email: string, password: string) => (
  await createUserWithEmailAndPassword(auth, email, password)
);

export const updateDisplayName = async (displayName: string) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser!!, {
      displayName,
    });
  }
}

export const createUserDoc = async (username: string, email: string) => {
  if (auth.currentUser) {
    await setDoc(doc(db, "users", auth.currentUser!!.uid), {
      displayName: username,
      email
    });
  }
}