import {
  asc,
  between,
  count,
  eq,
  getTableColumns,
  sql
} from 'drizzle-orm';
import { db } from '../index';
import { User, posts, users, todo } from '../schema';

export async function getUserById(id: User['id']): Promise<User[]> {
  return db.select().from(users).where(eq(users.id, id));
}

export const getData = async () => {
  const data = await db.select().from(todo);
  return data;
};

