"use server"

import { cookies } from 'next/headers';

export const getSessionCookie = async () => {
  try {
    return (await (cookies())).get('__session')?.value;
  }catch(error) {
    console.error('An error occurred while validating the user:', error);
    return undefined;
  }
}