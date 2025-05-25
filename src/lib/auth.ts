// // DATA
// import { revokeAllSessions } from "@/data/auth/sessions";
// // FIREBASE
// import { getAuth, getIdToken } from "firebase/auth"
// // CONFIG
// import { app } from "@/lib/firebase/client/config"
// // LIB
// import { 
//   getSessionCookieClientSide, 
//   removeSessionCookieClientSide, 
//   saveSessionCookieClientSide 
// } from "./cookies";
// import { createSessionCookie } from "@/data/auth/services/session-service";


// // @deprecated
// export const syncSessionCookie = async () => {
//   const currentUser = getAuth(app).currentUser;

//   if (currentUser) {
//     const idToken = await getIdToken(currentUser, true);
//     const sessionCookie = await createSessionCookie(idToken);

//     // saveSessionCookieClientSide(sessionCookie);    
//   } else {
//     removeSessionCookieClientSide();
//   }
// }

// // @deprecated
// export const destroySessionCookie = async () => {
//   const sessionCookie = getSessionCookieClientSide();

//   if (sessionCookie) {
//     await revokeAllSessions(sessionCookie);
//   }

//   removeSessionCookieClientSide();
// }

export const updateSessionCookie = async (idToken: string) => {
  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update session cookie");
  }
}

export const removeSessionCookie = async () => {
  const response = await fetch('/api/auth/sign-out', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to remove session cookie");
  }
}