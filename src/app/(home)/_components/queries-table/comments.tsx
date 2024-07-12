import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { QueryUpdateFormType } from './query-update-form';
import { Textarea } from '@/components/ui/textarea';

type CommentsProps = {
  form: UseFormReturn<QueryUpdateFormType>;
};

export default function Comments({ form }: CommentsProps) {
  return (
    <FormField
      control={form.control}
      name="comments"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Comments</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Why was this updated?"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
