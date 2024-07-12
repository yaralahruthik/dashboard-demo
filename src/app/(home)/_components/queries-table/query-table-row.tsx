import { TableCell, TableRow } from '@/components/ui/table';
import { formatTextForTable } from '@/utils/text';
import { QueryDataRow } from './get-queries-data';
import UpdateButtonWithDialog from './update-button-with-dialog';

type QueryTableRowProps = {
  query: QueryDataRow;
};

export default function QueryTableRow({ query }: QueryTableRowProps) {
  return (
    <TableRow key={query.id}>
      <TableCell>#{query.ticketId?.slice(0, 8)}</TableCell>
      <TableCell>{formatTextForTable(query.ticketStatus)}</TableCell>
      <TableCell>{formatTextForTable(query.predPriority)}</TableCell>
      <TableCell>{formatTextForTable(query.predAssignment)}</TableCell>
      <TableCell>{formatTextForTable(query.userQueryMode)}</TableCell>
      <TableCell>{formatTextForTable(query.manualPriority)}</TableCell>
      <TableCell>{formatTextForTable(query.manualAssignment)}</TableCell>
      <TableCell className="line-clamp-3">{query.comments || '-'}</TableCell>
      <TableCell>
        <UpdateButtonWithDialog query={query} />
      </TableCell>
    </TableRow>
  );
}
