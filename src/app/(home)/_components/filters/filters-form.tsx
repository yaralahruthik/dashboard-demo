'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import DateRangePicker from './date-range-picker';
import useDashboardFilters from '../../_hooks/use-dashboard-filters';

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

type FiltersFormProps = {
  postApply?: () => void;
};

export default function FiltersForm({ postApply }: FiltersFormProps) {
  const { applyFilters, clearFilters, getFilters } = useDashboardFilters();

  const form = useForm<FiltersFormType>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      query_date_range: {
        from: getFilters()?.from ? new Date(getFilters().from) : undefined,
        to: getFilters()?.to ? new Date(getFilters().to) : undefined,
      },
    },
  });

  const onSubmit = (data: FiltersFormType) => {
    let params = new URLSearchParams();

    if (data.query_date_range.from && data.query_date_range.to) {
      params.set('from', data.query_date_range.from.toDateString());
      params.set('to', data.query_date_range.to.toDateString());
    }

    applyFilters(params.toString());

    if (postApply) {
      postApply();
    }
  };

  const onClear = () => {
    form.reset({
      query_date_range: {
        from: undefined,
        to: undefined,
      },
    });
    clearFilters();
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
