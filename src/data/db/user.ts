"use server"

import { NewUser, users, customers } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm';
import { getCurrentUser } from "@/data/auth/currentUser";


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

export const getUserAccess = async (userId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('No user found');
  }

  const data = await db
    .select({
      id: users.id,
      subscriptionStatus: customers.subscriptionStatus,
      currentPeriodEnd: customers.currentPeriodEnd,
    })
    .from(users)
    .innerJoin(customers, eq(users.id, customers.userId))
    .where(eq(users.id, userId));

  return data.length ? data[0] : null;
}