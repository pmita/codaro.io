"use server"

// DRIZZLE
import { NewUser, users, customers, NewCustomer } from "@/db/schema";
import { db } from "@/db";
import { eq } from 'drizzle-orm';
// DATA
import { getCurrentUser } from "@/data/auth/currentUser";
// PACKAGES
import { differenceInCalendarDays } from "date-fns";
// TYPES
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

      if (!data[0]?.subscriptionStatus) {
        throw new Error('No subscription status found');
      }

      if (!data[0]?.currentPeriodEnd) {
        throw new Error('No current period end found');
      }
  
    return data.length ? data[0] : null;
    // return data[0];
  } catch(error) {
    console.error('Error getting user subscription status:', error);
    return null;
  }
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
    const isPeriodValid = userSubscription?.currentPeriodEnd && userSubscription.currentPeriodEnd > todaysDay;
    const daysPastExpired = userSubscription?.currentPeriodEnd 
      ? differenceInCalendarDays(todaysDay, userSubscription.currentPeriodEnd) 
      : 0;
  
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