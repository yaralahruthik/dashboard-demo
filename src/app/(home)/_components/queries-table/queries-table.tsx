import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Params } from '../../_types';
import { getFiltersFromSearchParams } from '../../_utils';

import QueryTableRow from './query-table-row';
import { getQueriesData } from './get-queries-data';

export default async function QueriesTable({ searchParams }: Params) {
  const filters = getFiltersFromSearchParams(searchParams);

  const queriesData = await getQueriesData(filters);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Predicted Priority</TableHead>
              <TableHead>Predicted Assignment</TableHead>
              <TableHead>User Query Mode</TableHead>
              <TableHead>Manual Priority</TableHead>
              <TableHead>Manual Assignment</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queriesData.map((query) => (
              <QueryTableRow key={query.id} query={query} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
