"use server"

// DRIZZLE
import { NewUser, users, customers, NewCustomer } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm';
// DATA
import { getCurrentUser } from "@/data/auth/actions/current-user";
// UTILS
import { calculateAccessPermission } from "./utils";


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

export const getUserSubscriptionStatus = async () => {
  try {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      throw new Error('No user found');
    }
  
    const data = await db
      .select({
        id: users.id,
        tier: users.tier,
        subscriptionStatus: customers.subscriptionStatus,
        currentPeriodEnd: customers.currentPeriodEnd,
      })
      .from(users)
      .innerJoin(customers, eq(users.id, customers.userId))
      .where(eq(users.id, currentUser.uid));

    if(!data.length) {
      throw new Error('No subscription found');
    }
  
    if (!data[0]?.id) {
      throw new Error('No user found');
    }

    if (!data[0]?.tier) {
      throw new Error('No subscription found');
    }

  return data.length 
    ? {
      ...data[0],
      canAccess: calculateAccessPermission(data[0].tier, data[0].currentPeriodEnd),
    }
    : null;
  } catch(error) {
    console.error('Error getting user subscription status:', error);
    return null;
  }
}