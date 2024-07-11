import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FiltersFormType } from './filters-form';

type TicketInputProps = {
  form: UseFormReturn<FiltersFormType>;
};

export default function TicketInput({ form }: TicketInputProps) {
  return (
    <FormField
      control={form.control}
      name="ticket_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ticket ID</FormLabel>
          <FormControl>
            <Input placeholder="Ticket #ID" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
