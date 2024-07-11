import {
  boolean,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersQuery = pgTable('user_query', {
  id: serial('id').primaryKey(),
  userName: varchar('user_name', { length: 50 }),
  phoneNo: varchar('phone_no', { length: 50 }),
  userQueryBody: text('user_query_body'),
  userQueryMode: varchar('user_query_mode', { length: 50 }),
  userQueryDatetimeUTC: timestamp('user_query_datetime_utc'),
  isQueryFlag: boolean('is_query_flag'),
  ticketId: varchar('ticket_id', { length: 50 }),
  queryResponseBody: text('query_response_body'),
  queryResponseDatetimeUTC: timestamp('query_response_datetime_utc'),
  predAssignment: varchar('pred_assignment', { length: 255 }),
  predAssignmentConfScore: numeric('pred_assignment_conf_score', {
    precision: 10,
    scale: 3,
  }),
  predAssignmentManualFlag: boolean('pred_assignment_manual_flag'),
  predPriorityManualFlag: boolean('pred_priority_manual_flag'),
  manualAssignment: varchar('manual_assignment', { length: 255 }),
  manualAssignmentDatetimeUTC: timestamp('manual_assignment_datetime_utc'),
  manualPriority: varchar('manual_priority', { length: 255 }),
  manualPriorityDatetimeUTC: timestamp('manual_priority_datetime_utc'),
  ticketStatus: varchar('ticket_status', { length: 255 }).default('Open'),
  ticketStatusClosedDatetimeUTC: timestamp('ticket_status_closed_datetime_utc'),
  comments: varchar('comments', { length: 1500 }),
  executive: varchar('executive', { length: 255 }).default('Unassigned'),
});
