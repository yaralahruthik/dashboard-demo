import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { QueryUpdateDataType } from '../update-schema';
import { TICKET_STATUSES } from '@/db/constants';

type TicketStatusProps = {
  form: UseFormReturn<QueryUpdateDataType>;
  description?: React.ReactNode;
};

export default function TicketStatus({ form, description }: TicketStatusProps) {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ticket Status</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Ticket Status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {TICKET_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
