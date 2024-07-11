export type Params = {
  searchParams: {
    from?: string;
    to?: string;
  };
};

export type DateRange = {
  from: string;
  to: string;
} | null;
