'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useDashboardFilters from '../../_hooks/use-dashboard-filters';
import DateRangePicker from './date-range-picker';

import AssignedDepartment from './assigned-department';
import ContactMode from './contact-mode';
import Priority from './priority';
import TicketInput from './ticket-input';
import QueryFlag from './query-flag';
import ConfirmationRequired from './confirmation-required';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    query_flag: z.string().trim().optional(),
    confirmation_flag: z.string().trim().optional(),
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
      priority: getFilters('priority') || '',
      ticket_id: getFilters('ticket_id') || '',
      assignment: getFilters('assignment') || '',
      contact: getFilters('contact') || '',
      query_flag: getFilters('query_flag') || '',
      confirmation_flag: getFilters('confirmation_flag') || '',
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

    if (data.query_flag) {
      params.set('query_flag', data.query_flag);
    }

    if (data.confirmation_flag) {
      params.set('confirmation_flag', data.confirmation_flag);
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
      query_flag: '',
      confirmation_flag: '',
    });
    clearFilters();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DateRangePicker form={form} />
        <Priority form={form} />
        <QueryFlag form={form} />
        <ConfirmationRequired form={form} />
        <TicketInput form={form} />
        <AssignedDepartment form={form} />
        <ContactMode form={form} />

        <div className="flex justify-between">
          <Button type="button" onClick={onClear} variant="secondary">
            Clear
          </Button>
          <Button>Apply</Button>
        </div>
      </form>
    </Form>
  );
}
