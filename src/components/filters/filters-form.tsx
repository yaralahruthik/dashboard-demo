'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import DateRangePicker from './date-range-picker';

const FiltersSchema = z.object({
  query_date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine(
      (data) => {
        if (data.from && data.to && data.from > data.to) {
          return false;
        }
        return true;
      },
      {
        path: ['query_date_range'],
        message: 'From date must be before to date',
      },
    ),
});

export type FiltersFormType = z.infer<typeof FiltersSchema>;

export default function FiltersForm() {
  const form = useForm<FiltersFormType>({
    resolver: zodResolver(FiltersSchema),
  });

  function onSubmit(data: FiltersFormType) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DateRangePicker form={form} />
        <div className="flex justify-between">
          <Button variant="secondary">Clear</Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </Form>
  );
}
