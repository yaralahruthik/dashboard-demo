'use server';

import { db } from '@/db';
import { QueryUpdateDataType, QueryUpdateSchema } from '../update-schema';
import { usersQuery } from '@/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateQueryAction(
  data: QueryUpdateDataType & { ticketId: string },
) {
  const parsedData = QueryUpdateSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid query data');
  }

  await db
    .update(usersQuery)
    .set({
      ticketStatus: parsedData.data.status,
      manualAssignment: parsedData.data.assignment,
      manualAssignmentDatetimeUTC: parsedData.data.assignment
        ? new Date()
        : null,
      manualPriority: parsedData.data.priority,
      manualPriorityDatetimeUTC: parsedData.data.priority ? new Date() : null,
      comments: parsedData.data.comments,
    })
    .where(eq(usersQuery.ticketId, data.ticketId));

  revalidatePath('/');
}
