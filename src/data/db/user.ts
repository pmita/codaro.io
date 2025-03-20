"use server"

import { NewUser, users, customers } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm';
import { getCurrentUser } from "@/data/auth/currentUser";
import { differenceInCalendarDays } from "date-fns";
import { PRO_STATUS } from "@/types/db";


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

  return data.length ? data[0] : null;
}

export const isSubscriptionValid = async () => {
  const userSubscription = await getUserSubscriptionStatus();

  if(!userSubscription) {
    return false;
  }

  if (!userSubscription?.id) {
    return false;
  }

  if (!userSubscription?.tier) {
    return false;
  }

    const todaysDay = new Date();
    const isPeriodValid = userSubscription?.currentPeriodEnd > todaysDay;
    const daysPastExpired = differenceInCalendarDays(todaysDay, userSubscription?.currentPeriodEnd);
  
    switch(userSubscription.tier) {
      case PRO_STATUS.LIFE_TIME:
        return true;
      case PRO_STATUS.ACTIVE:
      case PRO_STATUS.CANCELED:
        return isPeriodValid;
      case PRO_STATUS.PAST_DUE:
        return daysPastExpired < 7;
      case PRO_STATUS.UNPAID:
        return daysPastExpired < 15;
      default:
        return false;
    }  
}