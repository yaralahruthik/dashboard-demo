export type Params = {
  searchParams: {
    from?: string;
    to?: string;
    priority?: string;
    ticket_id?: string;
    assignment?: string;
    contact?: string;
  };
};

export type DateRange = {
  from: string;
  to: string;
} | null;
