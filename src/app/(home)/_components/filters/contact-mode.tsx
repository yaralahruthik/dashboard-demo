import useSWR from 'swr';
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
import { getContactModes } from '../../_actions';
import { covertUnderscoresToSpacesAndCapitalize } from '@/utils/formatKey';
import { Skeleton } from '@/components/ui/skeleton';

type ContactModeProps = {
  form: UseFormReturn<FiltersFormType>;
};

function useContactModes() {
  return useSWR('contact-modes', getContactModes);
}

export default function ContactMode({ form }: ContactModeProps) {
  const { data, isLoading } = useContactModes();

  return (
    <FormField
      control={form.control}
      name="assignment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contact Mode</FormLabel>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Contact Mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((contactMode) => (
                  <SelectItem
                    key={contactMode.value}
                    value={contactMode.value!}
                  >
                    {covertUnderscoresToSpacesAndCapitalize(contactMode.value!)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
