import { TableCell, TableRow } from '@/components/ui/table';
import { formatDateForTable, formatTextForTable } from '@/utils/text';
import { QueryDataRow } from './get-queries-data';
import UpdateButtonWithDialog from './update-button-with-dialog';

import { tableColumns } from './queries-table';
import {
  ShowDateTimeIconWithTooltip,
  ShowLongTextWithTooltip,
} from './tooltips';

type QueryTableRowProps = {
  query: QueryDataRow;
  idx: number;
  columns: typeof tableColumns;
};

export default function QueryTableRow({
  query,
  idx,
  columns,
}: QueryTableRowProps) {
  return (
    <TableRow key={query.ticketId}>
      {columns.map((column) => (
        <TableCell key={column.key}>
          {renderCellContent(column.key, query, idx)}
        </TableCell>
      ))}
    </TableRow>
  );
}

function renderCellContent(key: string, query: QueryDataRow, idx: number) {
  switch (key) {
    case 'index':
      return idx;
    case 'ticketId':
      return query.ticketId;
    case 'userName':
      return query.userName;
    case 'phoneNo':
      return <span className="text-nowrap text-sm">{query.phoneNo}</span>;
    case 'ticketStatus':
      return formatTextForTable(query.ticketStatus);
    case 'isQueryFlag':
      return formatTextForTable(`${query.isQueryFlag}`);
    case 'userQueryBody':
      return (
        <ShowLongTextWithTooltip text={query.userQueryBody}>
          <p className="max-w-[40ch] truncate">
            {formatTextForTable(query.userQueryBody)}
          </p>
        </ShowLongTextWithTooltip>
      );
    case 'executive':
      return formatTextForTable(query.executive);
    case 'predPriority':
      return formatTextForTable(query.predPriority);
    case 'predAssignment':
      return formatTextForTable(query.predAssignment);
    case 'userQueryMode':
      return formatTextForTable(query.userQueryMode);
    case 'manualPriority':
      return (
        <ShowDateTimeIconWithTooltip dateTime={query.manualPriorityDatetimeUTC}>
          {formatTextForTable(query.manualPriority)}
        </ShowDateTimeIconWithTooltip>
      );
    case 'manualAssignment':
      return (
        <ShowDateTimeIconWithTooltip
          dateTime={query.manualAssignmentDatetimeUTC}
        >
          {formatTextForTable(query.manualAssignment)}
        </ShowDateTimeIconWithTooltip>
      );
    case 'comments':
      return <span className="line-clamp-3">{query.comments || '-'}</span>;
    case 'actions':
      return <UpdateButtonWithDialog query={query} />;
    case 'predAssignmentManualFlag':
      return formatTextForTable(`${query.predAssignmentManualFlag}`);
    case 'userQueryDatetimeUTC':
      return (
        <div className="text-nowrap">
          <p>{formatDateForTable(query.userQueryDatetimeUTC)?.time}</p>
          <p>{formatDateForTable(query.userQueryDatetimeUTC)?.date}</p>
        </div>
      );
    default:
      return <p>{query[key as keyof QueryDataRow]?.toString()}</p>;
  }
}
