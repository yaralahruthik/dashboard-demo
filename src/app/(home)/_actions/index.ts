'use server';

import { db } from '@/db';
import { usersQuery } from '@/schema';

export async function getAssignedDepartments() {
  return [
    'plumbing',
    'finance',
    'human_resource',
    'operations',
    'admin',
    'cleaning',
    'other',
  ]
    .sort()
    .map((department) => ({ value: department }));
}

export async function getContactModes() {
  return await db
    .selectDistinct({ value: usersQuery.userQueryMode })
    .from(usersQuery)
    .orderBy(usersQuery.userQueryMode);
}
