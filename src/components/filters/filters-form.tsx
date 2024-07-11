'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import DateRangePicker from './date-range-picker';

const FiltersSchema = z
  .object({
    query_date_range: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }),
  })
  .refine(
    (data) => {
      const { from, to } = data.query_date_range;
      return !(from && to && from > to);
    },
    {
      message: 'From date must be before to date',
      path: ['query_date_range'],
    },
  )
  .refine(
    (data) => {
      const { from, to } = data.query_date_range;
      return !(from && !to);
    },
    {
      message: 'To date must be provided when from date is provided',
      path: ['query_date_range'],
    },
  );

export type FiltersFormType = z.infer<typeof FiltersSchema>;

export default function FiltersForm() {
  const form = useForm<FiltersFormType>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      query_date_range: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const onSubmit = (data: FiltersFormType) => {};

  const onClear = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DateRangePicker form={form} />
        <div className="flex justify-between">
          <Button onClick={onClear} variant="secondary">
            Clear
          </Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </Form>
  );
}
