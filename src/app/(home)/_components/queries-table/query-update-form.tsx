import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { QueryDataRow } from './get-queries-data';
import Priority from './priority';
import AssignedDepartment from './assigned-department';
import { formatTextForTable } from '@/utils/text';
import Comments from './comments';
import { QueryUpdateDataType, QueryUpdateSchema } from './update-schema';
import { updateQueryAction } from './update-query-action';

type QueryUpdateFormProps = {
  query: QueryDataRow;
  onClose: () => void;
};

export default function QueryUpdateForm({
  query,
  onClose,
}: QueryUpdateFormProps) {
  const form = useForm<QueryUpdateDataType>({
    resolver: zodResolver(QueryUpdateSchema),
    defaultValues: {
      priority: query.manualPriority || '',
      assignment: query.manualAssignment || '',
      comments: query.comments || '',
    },
  });

  const onSubmit = async (data: QueryUpdateDataType) => {
    try {
      await updateQueryAction({ ...data, id: query.id });
      onClose();
    } catch (error) {
      const err = error as Error;
      form.setError('root', { message: err.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Priority
          form={form}
          description={
            <>
              The predicted priority for this query is{' '}
              <strong>{query.predPriority}</strong>
            </>
          }
        />

        <AssignedDepartment
          form={form}
          description={
            <>
              The predicted department for this query is{' '}
              <strong>{formatTextForTable(query.predAssignment)}</strong>
            </>
          }
        />

        <Comments form={form} />

        <div className="flex justify-between">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button>Update</Button>
        </div>
      </form>
    </Form>
  );
}
