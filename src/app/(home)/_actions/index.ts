'use server';

import { db } from '@/db';
import { usersQuery } from '@/schema';

export async function getAssignedDepartments() {
  return await db
    .selectDistinct({ value: usersQuery.predAssignment })
    .from(usersQuery)
    .orderBy(usersQuery.predAssignment);
}

export async function getContactModes() {
  return await db
    .selectDistinct({ value: usersQuery.userQueryMode })
    .from(usersQuery)
    .orderBy(usersQuery.userQueryMode);
}
