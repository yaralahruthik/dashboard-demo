import {
  FormControl,
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
import { FiltersFormType } from './filters-form';

type QueryFlagProps = {
  form: UseFormReturn<FiltersFormType>;
};

export default function QueryFlag({ form }: QueryFlagProps) {
  return (
    <FormField
      control={form.control}
      name="query_flag"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Is Request</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Query Flag" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {['True', 'False'].map((flag) => (
                <SelectItem key={flag} value={flag}>
                  {flag}
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
