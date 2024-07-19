import { and, sql } from 'drizzle-orm';
import { addDays } from 'date-fns';
import { DateRange, Filters, Params } from '../_types';
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

export function getFiltersFromSearchParams(
  searchParams: Params['searchParams'],
) {
  return {
    dateRange: getDateRangeFromSearchParams(searchParams),
    priority: searchParams.priority,
    ticketId: searchParams.ticket_id,
    assignment: searchParams.assignment,
    contact: searchParams.contact,
  };
}

export function getUserQueryDateRangeSQL(dateRange?: DateRange | null) {
  if (!dateRange?.from || !dateRange?.to) {
    return undefined;
  }

  if (dateRange.from === dateRange.to) {
    const fromDate = new Date(dateRange.from);
    const toDate = addDays(fromDate, 1);
    return sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${fromDate.toDateString()} AND ${toDate.toDateString()}`;
  }

  const fromDate = new Date(dateRange.from);
  const toDate = addDays(dateRange.to, 1);

  return dateRange?.from && dateRange?.to
    ? sql`${usersQuery.userQueryDatetimeUTC} BETWEEN ${fromDate.toDateString()} AND ${toDate.toDateString()}`
    : undefined;
}

function getPrioritySQL(priority?: string | null) {
  return priority ? sql`${usersQuery.predPriority} = ${priority}` : undefined;
}

function getTicketIdSQL(ticketId?: string | null) {
  return ticketId ? sql`${usersQuery.ticketId} = ${ticketId}` : undefined;
}

function getAssignmentSQL(assignment?: string | null) {
  return assignment
    ? sql`${usersQuery.predAssignment} = ${assignment}`
    : undefined;
}

function getContactSQL(contact?: string | null) {
  return contact ? sql`${usersQuery.userQueryMode} = ${contact}` : undefined;
}

export function constructFiltersSQL(filters: Filters) {
  const dateRangeSQL = getUserQueryDateRangeSQL(filters.dateRange);
  const prioritySQL = getPrioritySQL(filters.priority);
  const ticketIdSQL = getTicketIdSQL(filters.ticketId);
  const assignmentSQL = getAssignmentSQL(filters.assignment);
  const contactSQL = getContactSQL(filters.contact);

  return and(dateRangeSQL, prioritySQL, ticketIdSQL, assignmentSQL, contactSQL);
}
