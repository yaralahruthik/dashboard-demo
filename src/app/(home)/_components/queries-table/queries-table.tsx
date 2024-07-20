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

export const tableColumns: { header: string; key: string }[] = [
  { header: 'No', key: 'index' },
  { header: 'Ticket ID', key: 'ticketId' },
  { header: 'Name', key: 'userName' },
  { header: 'Contact', key: 'phoneNo' },
  { header: 'Status', key: 'ticketStatus' },
  { header: 'Is Query', key: 'isQueryFlag' },
  { header: 'Customer Query', key: 'userQueryBody' },
  { header: 'Query Received', key: 'userQueryDatetimeUTC' },
  { header: 'Support Executive', key: 'executive' },
  { header: 'Confirmation Required', key: 'predAssignmentManualFlag' },
  { header: 'A.I Priority', key: 'predPriority' },
  { header: 'A.I Assignment', key: 'predAssignment' },
  { header: 'User Query Mode', key: 'userQueryMode' },
  { header: 'Manual Priority', key: 'manualPriority' },
  { header: 'Manual Assignment', key: 'manualAssignment' },
  { header: 'Comments', key: 'comments' },
  { header: '', key: 'actions' },
];

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
                {tableColumns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {queriesData.map((query, idx) => (
                <QueryTableRow
                  idx={idx + 1}
                  key={query.ticketId}
                  query={query}
                  columns={tableColumns}
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
