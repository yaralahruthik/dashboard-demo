import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Params } from '../../_types';
import { getFiltersFromSearchParams } from '../../_utils';

import QueryTableRow from './query-table-row';
import { getQueriesData } from './get-queries-data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default async function QueriesTable({ searchParams }: Params) {
  const filters = getFiltersFromSearchParams(searchParams);

  const queriesData = await getQueriesData(filters);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[800px]">
          <Table>
            <TableHeader className="sticky top-0 bg-secondary">
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Executive</TableHead>
                <TableHead>A.I Priority</TableHead>
                <TableHead>A.I Assignment</TableHead>
                <TableHead>User Query Mode</TableHead>
                <TableHead>Manual Priority</TableHead>
                <TableHead>Manual Assignment</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queriesData.map((query, idx) => (
                <QueryTableRow
                  idx={idx + 1}
                  key={query.ticketId}
                  query={query}
                />
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
