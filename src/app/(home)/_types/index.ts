export type Params = {
  searchParams: {
    from?: string;
    to?: string;
    priority?: string;
    ticket_id?: string;
    assignment?: string;
    contact?: string;
    query_flag?: string;
    confirmation_flag?: string;
  };
};

export type DateRange = {
  from: string;
  to: string;
} | null;

export type Filters = {
  dateRange?: DateRange;
  priority?: string;
  ticketId?: string;
  assignment?: string;
  contact?: string;
  queryFlag?: string;
  confirmationFlag?: string;
};
