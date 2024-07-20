'use server';

import { db } from '@/db';
import { usersQuery } from '@/schema';
import { isNotNull } from 'drizzle-orm';

export async function getAssignedDepartments() {
  return await db
    .selectDistinct({ value: usersQuery.predAssignment })
    .from(usersQuery)
    .where(isNotNull(usersQuery.predAssignment))
    .orderBy(usersQuery.predAssignment);
}

export async function getContactModes() {
  return await db
    .selectDistinct({ value: usersQuery.userQueryMode })
    .from(usersQuery)
    .where(isNotNull(usersQuery.userQueryMode))
    .orderBy(usersQuery.userQueryMode);
}
