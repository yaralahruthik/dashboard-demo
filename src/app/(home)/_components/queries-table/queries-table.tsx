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

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getQueriesData } from './get-queries-data';
import QueryTableRow from './query-table-row';
import MobileClearFilterButton from '../filters/clear-filters-button';
import FiltersButtonWithSheet from '../filters/filters-button-with-sheet';

export const tableColumns: { header: string; key: string }[] = [
  { header: 'No', key: 'index' },
  { header: 'Ticket ID', key: 'ticketId' },
  { header: 'Name', key: 'userName' },
  { header: 'Contact', key: 'phoneNo' },
  { header: 'Status', key: 'ticketStatus' },
  { header: 'Is Request', key: 'isQueryFlag' },
  { header: 'Employee Request', key: 'userQueryBody' },
  { header: 'Query Received', key: 'userQueryDatetimeUTC' },
  { header: 'Person In Charge', key: 'executive' },
  { header: 'Intervention Required', key: 'predAssignmentManualFlag' },
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
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>All Queries</CardTitle>
        <div className="flex items-center gap-2">
          <MobileClearFilterButton />
          <FiltersButtonWithSheet />
        </div>
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
