import { NewUser, users } from "@/db/schema";
import { db } from "@/db";


export const createUserTable = async (data: NewUser) => {
  await db.insert(users).values(data);
}