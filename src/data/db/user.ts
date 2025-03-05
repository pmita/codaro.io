"use server"

import { NewUser, users } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm';


export const addUserToDb = async (data: NewUser) => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (existingUser.length) {
    throw new Error('User already exists');
  }

  await db.insert(users).values(data);
}