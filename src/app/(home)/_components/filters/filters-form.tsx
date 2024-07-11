'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import DateRangePicker from './date-range-picker';
import useDashboardFilters from '../../_hooks/use-dashboard-filters';

import Priority from './priority';
import AssignedDepartment from './assigned-department';
import ContactMode from './contact-mode';
import TicketInput from './ticket-input';

const FiltersSchema = z
  .object({
    query_date_range: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }),
    priority: z.string().trim().optional(),
    ticket_id: z.string().trim().optional(),
    assignment: z.string().trim().optional(),
    contact: z.string().trim().optional(),
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
        from: getFilters('from') ? new Date(getFilters('from')!) : undefined,
        to: getFilters('to') ? new Date(getFilters('to')!) : undefined,
      },
      priority: getFilters('priority') ?? '',
      ticket_id: getFilters('ticket_id') ?? '',
      assignment: getFilters('assignment') ?? '',
      contact: getFilters('contact') ?? '',
    },
  });

  const onSubmit = (data: FiltersFormType) => {
    let params = new URLSearchParams();

    if (data.query_date_range.from && data.query_date_range.to) {
      params.set('from', data.query_date_range.from.toDateString());
      params.set('to', data.query_date_range.to.toDateString());
    }

    if (data.priority) {
      params.set('priority', data.priority);
    }

    if (data.ticket_id) {
      params.set('ticket_id', data.ticket_id);
    }

    if (data.assignment) {
      params.set('assignment', data.assignment);
    }

    if (data.contact) {
      params.set('contact', data.contact);
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
      priority: '',
      ticket_id: '',
      assignment: '',
      contact: '',
    });
    clearFilters();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DateRangePicker form={form} />
        <Priority form={form} />
        <TicketInput form={form} />
        <AssignedDepartment form={form} />
        <ContactMode form={form} />

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
