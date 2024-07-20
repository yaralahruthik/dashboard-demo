import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDateForTable } from '@/utils/text';

type ShowDateTimeIconWithTooltipProps = {
  dateTime: Date | null;
};

export function ShowDateTimeIconWithTooltip({
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

type ShowLongTextWithTooltipProps = {
  text: string | null;
};

export function ShowLongTextWithTooltip({
  text,
  children,
}: React.PropsWithChildren<ShowLongTextWithTooltipProps>) {
  if (!text) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="underline decoration-dotted underline-offset-2">
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-[50ch]">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
