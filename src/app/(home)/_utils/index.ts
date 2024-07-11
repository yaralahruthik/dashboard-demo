import { sql } from 'drizzle-orm';
import { DateRange, Params } from '../_types';
import { usersQuery } from '@/schema';

export function getDateRangeFromSearchParams(
  searchParams: Params['searchParams'],
) {
  if (searchParams.from && searchParams.to) {
    const from = searchParams.from;
    const to = searchParams.to;

    return { from, to };
  }

  return null;
}

export function getUserQueryDateRangeSQL(dateRange: DateRange) {
  return dateRange?.from && dateRange?.to
    ? sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${dateRange.from} AND ${dateRange.to}`
    : undefined;
}
