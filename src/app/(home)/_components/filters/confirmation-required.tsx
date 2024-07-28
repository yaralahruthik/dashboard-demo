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

type ConfirmationRequiredProps = {
  form: UseFormReturn<FiltersFormType>;
};

export default function ConfirmationRequired({
  form,
}: ConfirmationRequiredProps) {
  return (
    <FormField
      control={form.control}
      name="confirmation_flag"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Intervention Required</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Is Intervention Required" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {['Yes', 'No'].map((flag) => (
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
