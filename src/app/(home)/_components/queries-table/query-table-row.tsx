import { TableCell, TableRow } from '@/components/ui/table';
import { formatDateForTable, formatTextForTable } from '@/utils/text';
import { QueryDataRow } from './get-queries-data';
import UpdateButtonWithDialog from './update-button-with-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type QueryTableRowProps = {
  query: QueryDataRow;
};

export default function QueryTableRow({ query }: QueryTableRowProps) {
  return (
    <TableRow key={query.ticketId}>
      <TableCell>{query.ticketId}</TableCell>
      <TableCell>{formatTextForTable(query.ticketStatus)}</TableCell>
      <TableCell>{formatTextForTable(query.executive)}</TableCell>
      <TableCell>{formatTextForTable(query.predPriority)}</TableCell>
      <TableCell>{formatTextForTable(query.predAssignment)}</TableCell>
      <TableCell>{formatTextForTable(query.userQueryMode)}</TableCell>
      <TableCell>
        <ShowDateTimeIconWithTooltip dateTime={query.manualPriorityDatetimeUTC}>
          {formatTextForTable(query.manualPriority)}
        </ShowDateTimeIconWithTooltip>
      </TableCell>
      <TableCell>
        <ShowDateTimeIconWithTooltip
          dateTime={query.manualAssignmentDatetimeUTC}
        >
          {formatTextForTable(query.manualAssignment)}
        </ShowDateTimeIconWithTooltip>
      </TableCell>
      <TableCell className="line-clamp-3">{query.comments || '-'}</TableCell>
      <TableCell>
        <UpdateButtonWithDialog query={query} />
      </TableCell>
    </TableRow>
  );
}

type ShowDateTimeIconWithTooltipProps = {
  dateTime: Date | null;
};

function ShowDateTimeIconWithTooltip({
  dateTime,
  children,
}: React.PropsWithChildren<ShowDateTimeIconWithTooltipProps>) {
  if (!dateTime) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="underline decoration-dotted underline-offset-2">
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>Updated Time</p>
          <p>{formatDateForTable(dateTime)?.time}</p>
          <p>{formatDateForTable(dateTime)?.date}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
