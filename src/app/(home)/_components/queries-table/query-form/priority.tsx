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

type PriorityProps = {
  form: UseFormReturn<QueryUpdateDataType>;
  description?: React.ReactNode;
};

export default function Priority({ form, description }: PriorityProps) {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Ticket Priority" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {['High', 'Low', 'Medium'].map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
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
