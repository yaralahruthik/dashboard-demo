import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { FiltersFormType } from './filters-form';

type DateRangePickerProps = {
  form: UseFormReturn<FiltersFormType>;
};

export default function DateRangePicker({ form }: DateRangePickerProps) {
  return (
    <FormField
      control={form.control}
      name="query_date_range"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Query Date Range</FormLabel>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value?.from && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value?.from ? (
                  field.value?.to ? (
                    <>
                      {format(field.value.from, 'LLL dd, y')} -{' '}
                      {format(field.value.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(field.value.from, 'LLL dd, y')
                  )
                ) : (
                  <span>From - To</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                initialFocus
                mode="range"
                selected={{
                  from: field.value?.from,
                  to: field.value?.to,
                }}
                onSelect={field.onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
