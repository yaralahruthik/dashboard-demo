'use server';

import { db } from '@/db';
import { cache } from 'react';
import { constructFiltersSQL } from '../../_utils';
import { Filters } from '../../_types';

export const getQueriesData = cache(async (filters: Filters) => {
  return db.query.usersQuery.findMany({
    columns: {
      id: true,
      ticketId: true,
      ticketStatus: true,
      userName: true,
      queryResponseBody: true,
      executive: true,
      predAssignment: true,
      predPriority: true,
      userQueryDatetimeUTC: true,
      userQueryMode: true,
      manualAssignment: true,
      manualAssignmentDatetimeUTC: true,
      manualPriority: true,
      manualPriorityDatetimeUTC: true,
      comments: true,
    },
    orderBy: (usersQuery, { desc }) => [desc(usersQuery.userQueryDatetimeUTC)],
    where: constructFiltersSQL(filters),
  });
});

export type QueryDataRow = Awaited<ReturnType<typeof getQueriesData>>[number];
