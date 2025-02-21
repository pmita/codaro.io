"use server"

import { revalidatePath } from 'next/cache';
import { db } from '../index';
import { 
  InsertPost,
  InsertTodo,
  NewUser,
  posts,
  users,
  todo
} from '../schema';
import { eq, not } from 'drizzle-orm';


export async function createUser(data: NewUser) {
  await db.insert(users).values(data);
}

export async function createPost(data: InsertPost) {
  await db.insert(posts).values(data);
}

export async function createTodo(data: InsertTodo) {
  await db.insert(todo).values(data);
}

export async function deleteTodo(id: number) {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath('/');
}

export async function toggleTodo(id: number) {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));

    revalidatePath('/');
}

export async function editPost(id: number, text: string) {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));

    revalidatePath('/');
}
