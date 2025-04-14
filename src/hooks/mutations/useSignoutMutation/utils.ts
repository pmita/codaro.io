import { signOut, getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/client/config";

export const signout = async () => await signOut(getAuth(app));